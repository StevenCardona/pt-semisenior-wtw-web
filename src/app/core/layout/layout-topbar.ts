import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { LucideMenu } from '@lucide/angular';
import { filter, map } from 'rxjs';

import { UserMenu, UserMenuItem } from '@core/layout/menu/user-menu';
import { APP_NAME } from '@shared/constants/app-name.constants';
import { CURRENT_USER } from '@shared/constants/current-user';
import { getInitials } from '@shared/utils/string.utils';

type Breadcrumb = {
  label: string;
};

const DEFAULT_CRUMBS: Breadcrumb[] = [
  { label: APP_NAME },
  { label: 'Operaciones' },
];

@Component({
  selector: 'app-layout-topbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserMenu, LucideMenu],
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
        <svg lucideMenu [size]="20" class="size-5"></svg>
      </button>

      <nav class="min-w-0 text-sm" aria-label="Breadcrumb">
        <ol class="flex items-center gap-1.5 text-slate-400">
          @for (crumb of crumbs(); track crumb.label; let last = $last) {
            @if (!$first) {
              <li aria-hidden="true" class="text-slate-300">›</li>
            }
            <li
              class="truncate"
              [class.font-medium]="last"
              [class.text-slate-700]="last"
            >
              {{ crumb.label }}
            </li>
          }
        </ol>
      </nav>
    </div>

    <app-user-menu
      [name]="currentUser.name"
      [email]="currentUser.email"
      [initials]="userInitials"
      [items]="userMenuItems"
    />
  `,
})
export class LayoutTopbar {
  private readonly router = inject(Router);

  readonly menuToggle = output<void>();

  readonly currentUser = CURRENT_USER;
  readonly userInitials = getInitials(CURRENT_USER.name);

  readonly userMenuItems: UserMenuItem[] = [
    { id: 'logout', label: 'Cerrar sesión' },
  ];

  readonly crumbs = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.buildCrumbs()),
    ),
    { initialValue: DEFAULT_CRUMBS },
  );

  private buildCrumbs(): Breadcrumb[] {
    let route = this.router.routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const label = route.snapshot?.title || 'Operaciones';
    return [{ label: APP_NAME }, { label }];
  }
}
