export const TASK_PRIORITIES = {
  Low: 'low',
  Medium: 'medium',
  High: 'high',
} as const;

export type TaskPriority =
  (typeof TASK_PRIORITIES)[keyof typeof TASK_PRIORITIES];

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
};

export const TASK_PRIORITY_OPTIONS: ReadonlyArray<{
  value: TaskPriority;
  label: string;
}> = [
  { value: TASK_PRIORITIES.Low, label: TASK_PRIORITY_LABELS.low },
  { value: TASK_PRIORITIES.Medium, label: TASK_PRIORITY_LABELS.medium },
  { value: TASK_PRIORITIES.High, label: TASK_PRIORITY_LABELS.high },
];
