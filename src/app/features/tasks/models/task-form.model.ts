export type TaskFormValue = {
  name: string;
  description: string;
  userId: number | null;
};

export type TaskFormField = 'name' | 'description' | 'userId';

export const TASK_FORM_REQUIRED_MESSAGES: Partial<
  Record<TaskFormField, string>
> = {
  name: 'Ponle un título a la tarea.',
  userId: 'Elige a quién se la asignas.',
};

export const TASK_FORM_MAX_LENGTH_MESSAGES: Partial<
  Record<TaskFormField, string>
> = {
  name: 'El título quedó un poco largo; acórtalo un poco.',
  description: 'La descripción es demasiado larga; resúmela un poco.',
};
