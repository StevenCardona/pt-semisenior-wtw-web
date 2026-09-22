import { TaskStatus } from '@shared/constants/task-status.constants';
import { TaskPriority } from '@shared/constants/task-priority.constants';
import { UserRole } from '@shared/constants/user-roles.constants';

export interface TaskAssignedTo {
  id: number;
  name: string;
  mail: string;
  rol: UserRole;
}

export interface TaskAdditionalInfo {
  priority?: TaskPriority | null;
  dueDate?: string | null;
  tags?: string[] | null;
  metadata?: Record<string, unknown> | null;
}

export interface Task {
  id: number;
  name: string;
  description: string | null;
  status: TaskStatus;
  assignedTo: TaskAssignedTo;
  additionalInfo: TaskAdditionalInfo | null;
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
  additionalInfo?: TaskAdditionalInfo | null;
}

export interface ChangeTaskStatusRequest {
  status: TaskStatus;
  updatedBy: number;
}

export interface UpdateTaskAdditionalInfoRequest {
  priority: TaskPriority;
  updatedBy: number;
}

export interface GetTasksParams {
  orderBy?: string | null;
  priority?: TaskPriority | null;
}

export interface GetTasksByUserParams {
  userId: number;
  status?: TaskStatus | null;
  orderBy?: string | null;
  priority?: TaskPriority | null;
}
