export const USER_ROLES = {
  Admin: 'admin',
  User: 'user',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Admin',
  user: 'User',
};

export function roleLabel(rol: string): string {
  return ROLE_LABELS[rol as UserRole] ?? 'User';
}
