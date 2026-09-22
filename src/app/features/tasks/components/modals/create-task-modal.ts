import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LucideX } from '@lucide/angular';
import { finalize } from 'rxjs';

import { ToastService } from '@core/services/toast.service';
import { CURRENT_USER } from '@shared/constants/current-user';
import { User } from '@features/users/models/user.model';

import { TaskFormValue } from '../../models/task-form.model';
import { TasksApiService } from '../../services/tasks-api.service';
import { TaskForm } from '../forms/task-form';

@Component({
  selector: 'app-create-task-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TaskForm, LucideX],
  host: {
    '(document:keydown.escape)': 'requestClose()',
  },
  templateUrl: './create-task-modal.html',
})
export class CreateTaskModal {
  private readonly tasksApi = inject(TasksApiService);
  private readonly toast = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly taskForm = viewChild(TaskForm);

  readonly users = input.required<User[]>();
  readonly closed = output<void>();
  readonly created = output<void>();

  readonly submitting = signal(false);

  requestClose(): void {
    if (this.submitting()) {
      return;
    }
    this.closed.emit();
  }

  onFormSubmit(value: TaskFormValue): void {
    if (this.submitting() || value.userId == null) {
      return;
    }

    this.submitting.set(true);
    this.tasksApi
      .createTask({
        name: value.name,
        description: value.description.trim() || null,
        userId: value.userId,
        createdBy: CURRENT_USER.id,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.submitting.set(false)),
      )
      .subscribe({
        next: () => {
          this.toast.show('Tarea creada correctamente.', 'success');
          this.taskForm()?.reset();
          this.created.emit();
        },
      });
  }
}
