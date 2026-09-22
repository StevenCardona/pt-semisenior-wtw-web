import { TaskStatus } from '@shared/constants/task-status.constants';
import { UserRole } from '@shared/constants/user-roles.constants';

export interface TaskAssignedTo {
  id: number;
  name: string;
  mail: string;
  rol: UserRole;
}

export interface Task {
  id: number;
  name: string;
  description: string | null;
  status: TaskStatus;
  assignedTo: TaskAssignedTo;
  createdBy: number;
  createdDate: string;
  updatedBy: number | null;
  updatedDate: string | null;
}

export interface CreateTaskRequest {
  name: string;
  description?: string | null;
  userId: number;
  createdBy: number;
}

export interface ChangeTaskStatusRequest {
  status: TaskStatus;
  updatedBy: number;
}

export interface GetTasksParams {
  orderBy?: string | null;
}

export interface GetTasksByUserParams {
  userId: number;
  status?: TaskStatus | null;
  orderBy?: string | null;
}
