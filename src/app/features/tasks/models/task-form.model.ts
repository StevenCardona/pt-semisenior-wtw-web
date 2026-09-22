import { TaskPriority } from '@shared/constants/task-priority.constants';

export type TaskFormValue = {
  name: string;
  description: string;
  userId: number | null;
  priority: TaskPriority;
  dueDate: string;
  tags: string;
};

export type TaskFormField =
  | 'name'
  | 'description'
  | 'userId'
  | 'priority'
  | 'dueDate'
  | 'tags';

export const TASK_FORM_REQUIRED_MESSAGES: Partial<
  Record<TaskFormField, string>
> = {
  name: 'Ponle un título a la tarea.',
  userId: 'Elige a quién se la asignas.',
  priority: 'Elige una prioridad.',
};

export const TASK_FORM_MAX_LENGTH_MESSAGES: Partial<
  Record<TaskFormField, string>
> = {
  name: 'El título quedó un poco largo; acórtalo un poco.',
  description: 'La descripción es demasiado larga; resúmela un poco.',
};
