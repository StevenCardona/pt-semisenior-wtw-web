import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { MenuItem } from '@core/layout/menu/menu-item';
import { AppLogo } from '@shared/components/app-logo';

type NavItem = {
  label: string;
  route: string;
  icon: 'tasks' | 'users';
};

@Component({
  selector: 'app-layout-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppLogo, MenuItem],
  host: {
    class:
      'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-slate-100 transition-transform duration-200 ease-out lg:static lg:translate-x-0',
    '[class.-translate-x-full]': '!open()',
    '[class.translate-x-0]': 'open()',
  },
  template: `
    <div class="flex h-14 items-center border-b border-slate-200 px-4">
      <app-logo />
    </div>

    <nav class="flex flex-1 flex-col gap-6 overflow-y-auto p-4" aria-label="Principal">
      <div>
        <p class="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Menú
        </p>
        <ul class="space-y-1">
          @for (item of navItems; track item.route) {
            <li>
              <app-menu-item [label]="item.label" [route]="item.route" (pressed)="close.emit()">
                @switch (item.icon) {
                  @case ('tasks') {
                    <svg
                      class="size-5 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                    </svg>
                  }
                  @case ('users') {
                    <svg
                      class="size-5 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 00-3-3.87" />
                      <path d="M16 3.13a4 4 0 010 7.75" />
                    </svg>
                  }
                }
              </app-menu-item>
            </li>
          }
        </ul>
      </div>
    </nav>

    <footer class="border-t border-slate-200 px-4 py-3">
      <p class="text-[11px] text-slate-400">Versión web V2.0.0</p>
    </footer>
  `,
})
export class LayoutSidebar {
  readonly open = input(false);
  readonly close = output<void>();

  readonly navItems: readonly NavItem[] = [
    { label: 'Tareas', route: '/tasks', icon: 'tasks' },
    { label: 'Usuarios', route: '/users', icon: 'users' },
  ];
}
