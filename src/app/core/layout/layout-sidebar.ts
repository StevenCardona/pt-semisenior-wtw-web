import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { LucideListTodo, LucideUsers } from '@lucide/angular';

import { MenuItem } from '@core/layout/menu/menu-item';
import { AppLogo } from '@shared/components/app-logo';
import { SidebarCredit } from '@shared/components/sidebar-credit';
import { NAV_ITEMS } from '@shared/constants/nav.constants';

@Component({
  selector: 'app-layout-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppLogo, MenuItem, LucideListTodo, LucideUsers, SidebarCredit],
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
                    <svg lucideListTodo [size]="20" class="size-5 shrink-0"></svg>
                  }
                  @case ('users') {
                    <svg lucideUsers [size]="20" class="size-5 shrink-0"></svg>
                  }
                }
              </app-menu-item>
            </li>
          }
        </ul>
      </div>
    </nav>

    <footer class="border-t border-slate-200 px-4 py-3">
      <app-sidebar-credit />
    </footer>
  `,
})
export class LayoutSidebar {
  readonly open = input(false);
  readonly close = output<void>();

  readonly navItems = NAV_ITEMS;
}
