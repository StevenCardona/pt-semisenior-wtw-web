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

import {
  USER_FORM_MAX_LENGTH_MESSAGES,
  USER_FORM_REQUIRED_MESSAGES,
  UserFormField,
  UserFormValue,
} from '../../models/user-form.model';

@Component({
  selector: 'app-user-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.html',
})
export class UserForm {
  private readonly fb = inject(FormBuilder);

  readonly submitting = input(false);
  readonly submitted = output<UserFormValue>();

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(200)]],
    mail: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(256)],
    ],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitted.emit(this.form.getRawValue());
  }

  reset(): void {
    this.form.reset({
      name: '',
      mail: '',
    });
  }

  fieldError(field: UserFormField): string | null {
    const control = this.form.controls[field];
    if (!control.touched || !control.errors) {
      return null;
    }

    if (control.errors['required']) {
      return USER_FORM_REQUIRED_MESSAGES[field];
    }

    if (control.errors['email']) {
      return 'El correo no tiene un formato válido.';
    }

    if (control.errors['maxlength']) {
      return USER_FORM_MAX_LENGTH_MESSAGES[field];
    }

    return null;
  }
}
