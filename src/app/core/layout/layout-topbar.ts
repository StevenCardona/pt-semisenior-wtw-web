import { ChangeDetectionStrategy, Component, output } from '@angular/core';

import { UserMenu, UserMenuItem } from '@core/layout/menu/user-menu';

@Component({
  selector: 'app-layout-topbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserMenu],
  host: {
    class:
      'flex h-14 shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 lg:px-6',
  },
  template: `
    <div class="flex min-w-0 items-center gap-3">
      <button
        type="button"
        class="inline-flex size-9 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
        aria-label="Abrir menú de navegación"
        (click)="menuToggle.emit()"
      >
        <svg
          class="size-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <nav class="min-w-0 text-sm" aria-label="Breadcrumb">
        <ol class="flex items-center gap-1.5 text-slate-400">
          <li class="truncate">TaskFlow</li>
          <li aria-hidden="true" class="text-slate-300">›</li>
          <li class="truncate font-medium text-slate-700">Operaciones</li>
        </ol>
      </nav>
    </div>

    <app-user-menu
      name="Usuario demo"
      email="demo@taskflow.app"
      initials="UD"
      [items]="userMenuItems"
    />
  `,
})
export class LayoutTopbar {
  readonly menuToggle = output<void>();

  readonly userMenuItems: UserMenuItem[] = [
    { id: 'logout', label: 'Cerrar sesión' },
  ];
}
