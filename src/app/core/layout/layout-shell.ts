import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LayoutSidebar } from '@core/layout/layout-sidebar';
import { LayoutTopbar } from '@core/layout/layout-topbar';

@Component({
  selector: 'app-layout-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LayoutSidebar, LayoutTopbar, RouterOutlet],
  template: `
    <div class="flex h-dvh overflow-hidden bg-surface">
      <app-layout-sidebar [open]="sidebarOpen()" (close)="closeSidebar()" />

      @if (sidebarOpen()) {
        <button
          type="button"
          class="fixed inset-0 z-30 bg-black/40 lg:hidden"
          aria-label="Cerrar menú de navegación"
          (click)="closeSidebar()"
        ></button>
      }

      <div class="flex min-w-0 flex-1 flex-col">
        <app-layout-topbar (menuToggle)="toggleSidebar()" />
        <main class="flex-1 overflow-auto">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
})
export class LayoutShell {
  readonly sidebarOpen = signal(false);

  toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }
}
