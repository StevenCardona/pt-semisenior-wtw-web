export const TASK_STATUSES = {
  Pending: 'pending',
  InProgress: 'inProgress',
  Done: 'done',
} as const;

export type TaskStatus = (typeof TASK_STATUSES)[keyof typeof TASK_STATUSES];

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  pending: 'Pendiente',
  inProgress: 'En progreso',
  done: 'Completada',
};

export function taskStatusLabel(status: string): string {
  return TASK_STATUS_LABELS[status as TaskStatus] ?? status;
}

export function nextTaskStatus(status: TaskStatus): TaskStatus | null {
  if (status === TASK_STATUSES.Pending) {
    return TASK_STATUSES.InProgress;
  }
  if (status === TASK_STATUSES.InProgress) {
    return TASK_STATUSES.Done;
  }
  return null;
}

export function advanceActionLabel(status: TaskStatus): string | null {
  if (status === TASK_STATUSES.Pending) {
    return 'Iniciar';
  }
  if (status === TASK_STATUSES.InProgress) {
    return 'Completada';
  }
  return null;
}

export function advanceActionLoadingLabel(status: TaskStatus): string | null {
  if (status === TASK_STATUSES.Pending) {
    return 'Iniciando…';
  }
  if (status === TASK_STATUSES.InProgress) {
    return 'Completando…';
  }
  return null;
}
