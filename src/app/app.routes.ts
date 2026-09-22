import { Routes } from '@angular/router';

import { LayoutShell } from '@core/layout/layout-shell';

export const routes: Routes = [
  {
    path: '',
    component: LayoutShell,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tasks',
      },
      {
        path: 'tasks',
        loadChildren: () =>
          import('./features/tasks/tasks.routes').then(
            (routesModule) => routesModule.TASKS_ROUTES,
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./features/users/users.routes').then(
            (routesModule) => routesModule.USERS_ROUTES,
          ),
      },
    ],
  },
];
