import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import {
  TaskStatus,
  taskStatusLabel,
} from '@shared/constants/task-status.constants';

@Component({
  selector: 'app-status-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium"
      [class.bg-amber-50]="status() === 'pending'"
      [class.text-amber-700]="status() === 'pending'"
      [class.bg-sky-50]="status() === 'inProgress'"
      [class.text-sky-700]="status() === 'inProgress'"
      [class.bg-emerald-50]="status() === 'done'"
      [class.text-emerald-700]="status() === 'done'"
    >
      {{ label() }}
    </span>
  `,
})
export class StatusBadge {
  readonly status = input.required<TaskStatus | string>();

  readonly label = computed(() => taskStatusLabel(this.status()));
}
