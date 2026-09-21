import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

export type UserMenuItem = {
  id: string;
  label: string;
};

@Component({
  selector: 'app-user-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'relative shrink-0',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'onEscape()',
  },
  template: `
    <button
      type="button"
      class="flex size-9 items-center justify-center overflow-hidden rounded-full bg-brand-100 text-sm font-semibold text-brand-700 ring-2 ring-white transition hover:ring-brand-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      [attr.aria-expanded]="menuOpen()"
      aria-haspopup="menu"
      aria-controls="user-menu"
      aria-label="Menú de usuario"
      (click)="toggleMenu(); $event.stopPropagation()"
    >
      {{ initials() }}
    </button>

    @if (menuOpen()) {
      <div
        id="user-menu"
        role="menu"
        aria-label="Opciones de usuario"
        class="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
      >
        <div class="border-b border-slate-100 px-3 py-2.5">
          <p class="truncate text-sm font-medium text-ink">{{ name() }}</p>
          <p class="truncate text-xs text-slate-500">{{ email() }}</p>
        </div>
        @for (item of items(); track item.id) {
          <button
            type="button"
            role="menuitem"
            class="block w-full px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-50"
            (click)="selectItem(item.id)"
          >
            {{ item.label }}
          </button>
        }
      </div>
    }
  `,
})
export class UserMenu {
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly name = input.required<string>();
  readonly email = input.required<string>();
  readonly initials = input.required<string>();
  readonly items = input<UserMenuItem[]>([]);
  readonly itemSelect = output<string>();

  readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  selectItem(id: string): void {
    this.itemSelect.emit(id);
    this.closeMenu();
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.menuOpen()) {
      return;
    }
    const target = event.target as Node | null;
    if (target && !this.host.nativeElement.contains(target)) {
      this.closeMenu();
    }
  }

  onEscape(): void {
    if (this.menuOpen()) {
      this.closeMenu();
    }
  }
}
