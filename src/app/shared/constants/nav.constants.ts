export type NavIcon = 'tasks' | 'users';

export type NavItem = {
  label: string;
  route: string;
  icon: NavIcon;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Tareas', route: '/tasks', icon: 'tasks' },
  { label: 'Usuarios', route: '/users', icon: 'users' },
];
