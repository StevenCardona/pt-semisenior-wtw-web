import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { LucideCircleCheck, LucidePlay } from '@lucide/angular';

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
  readonly advanceStatus = output<{ id: number; status: TaskStatus }>();

  readonly getInitials = getInitials;
  readonly nextStatus = nextTaskStatus;
  readonly actionLabel = advanceActionLabel;
  readonly actionLoadingLabel = advanceActionLoadingLabel;
  readonly statuses = TASK_STATUSES;

  onAdvance(task: Task): void {
    const next = nextTaskStatus(task.status);
    if (!next || this.advancingId() != null) {
      return;
    }
    this.advanceStatus.emit({ id: task.id, status: next });
  }
}
