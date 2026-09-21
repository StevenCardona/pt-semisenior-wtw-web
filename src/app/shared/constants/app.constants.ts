/** Roles de usuario alineados con el enum camelCase de la API. */
export const USER_ROLES = {
  Admin: 'admin',
  User: 'user',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const API_PATHS = {
  users: 'users',
  tasks: 'tasks',
} as const;
