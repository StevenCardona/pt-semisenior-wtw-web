import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { UsersSelector } from '@features/users/components/selector/users-selector';
import { User } from '@features/users/models/user.model';
import {
  TASK_PRIORITIES,
  TASK_PRIORITY_OPTIONS,
} from '@shared/constants/task-priority.constants';

import {
  TASK_FORM_MAX_LENGTH_MESSAGES,
  TASK_FORM_REQUIRED_MESSAGES,
  TaskFormField,
  TaskFormValue,
} from '../../models/task-form.model';

@Component({
  selector: 'app-task-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, UsersSelector],
  templateUrl: './task-form.html',
})
export class TaskForm {
  private readonly fb = inject(FormBuilder);

  readonly users = input.required<User[]>();
  readonly submitting = input(false);
  readonly submitted = output<TaskFormValue>();

  readonly priorityOptions = TASK_PRIORITY_OPTIONS;

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(200)]],
    description: ['', [Validators.maxLength(2000)]],
    userId: this.fb.control<number | null>(null, {
      validators: [Validators.required],
    }),
    priority: this.fb.nonNullable.control(TASK_PRIORITIES.Medium, {
      validators: [Validators.required],
    }),
    dueDate: [''],
    tags: [''],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitted.emit(this.form.getRawValue());
  }

  onUserChange(userId: number | null): void {
    this.form.controls.userId.setValue(userId);
    this.form.controls.userId.markAsTouched();
  }

  reset(): void {
    this.form.reset({
      name: '',
      description: '',
      userId: null,
      priority: TASK_PRIORITIES.Medium,
      dueDate: '',
      tags: '',
    });
  }

  fieldError(field: TaskFormField): string | null {
    const control = this.form.controls[field];
    if (!control.touched || !control.errors) {
      return null;
    }

    if (control.errors['required']) {
      return TASK_FORM_REQUIRED_MESSAGES[field] ?? null;
    }

    if (control.errors['maxlength']) {
      return TASK_FORM_MAX_LENGTH_MESSAGES[field] ?? null;
    }

    return null;
  }
}
