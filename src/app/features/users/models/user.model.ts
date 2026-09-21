import { UserRole } from '@shared/constants/app.constants';

export interface User {
  id: number;
  name: string;
  mail: string;
  rol: UserRole;
  createdBy: number;
  createdDate: string;
  updatedBy: number | null;
  updatedDate: string | null;
}

export interface CreateUserRequest {
  name: string;
  mail: string;
  rol: UserRole;
  createdBy: number;
}
