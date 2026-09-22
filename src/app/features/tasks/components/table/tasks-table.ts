import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { LucideCircleCheck, LucidePlay } from '@lucide/angular';

import {
  TASK_PRIORITY_LABELS,
  TaskPriority,
} from '@shared/constants/task-priority.constants';
import {
  advanceActionLabel,
  advanceActionLoadingLabel,
  nextTaskStatus,
  TaskStatus,
  TASK_STATUSES,
} from '@shared/constants/task-status.constants';
import { EmptyRow } from '@shared/table-skeleton/empty-row';
import { getInitials } from '@shared/utils/string.utils';

import { Task } from '../../models/task.model';
import { StatusBadge } from '../status-badge/status-badge';

@Component({
  selector: 'app-tasks-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, EmptyRow, StatusBadge, LucidePlay, LucideCircleCheck],
  templateUrl: './tasks-table.html',
})
export class TasksTable {
  readonly tasks = input.required<Task[]>();
  readonly advancingId = input<number | null>(null);
  readonly updatingPriorityId = input<number | null>(null);
  readonly advanceStatus = output<{ id: number; status: TaskStatus }>();
  readonly priorityChange = output<{ id: number; priority: TaskPriority }>();

  readonly getInitials = getInitials;
  readonly nextStatus = nextTaskStatus;
  readonly actionLabel = advanceActionLabel;
  readonly actionLoadingLabel = advanceActionLoadingLabel;
  readonly statuses = TASK_STATUSES;
  readonly priorityLabels = TASK_PRIORITY_LABELS;

  onAdvance(task: Task): void {
    const next = nextTaskStatus(task.status);
    if (!next || this.advancingId() != null) {
      return;
    }
    this.advanceStatus.emit({ id: task.id, status: next });
  }

  onPriorityChange(task: Task, event: Event): void {
    const priority = (event.target as HTMLSelectElement).value as TaskPriority;
    if (!priority || this.updatingPriorityId() != null) {
      return;
    }
    if (task.additionalInfo?.priority === priority) {
      return;
    }
    this.priorityChange.emit({ id: task.id, priority });
  }

  priorityBadgeClass(priority: string | null | undefined): string {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'low':
        return 'bg-slate-100 text-slate-600';
      case 'medium':
      default:
        return 'bg-amber-100 text-amber-700';
    }
  }
}
