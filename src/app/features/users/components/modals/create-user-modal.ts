import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

import { ToastService } from '@core/services/toast.service';
import { USER_ROLES } from '@shared/constants/app.constants';
import { CURRENT_USER } from '@shared/constants/current-user';

import { UserFormValue } from '../../models/user-form.model';
import { UsersApiService } from '../../services/users-api.service';
import { UserForm } from '../forms/user-form';

@Component({
  selector: 'app-create-user-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserForm],
  host: {
    '(document:keydown.escape)': 'requestClose()',
  },
  templateUrl: './create-user-modal.html',
})
export class CreateUserModal {
  private readonly usersApi = inject(UsersApiService);
  private readonly toast = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly userForm = viewChild(UserForm);

  readonly closed = output<void>();
  readonly created = output<void>();

  readonly submitting = signal(false);

  requestClose(): void {
    if (this.submitting()) {
      return;
    }
    this.closed.emit();
  }

  onFormSubmit(value: UserFormValue): void {
    if (this.submitting()) {
      return;
    }

    this.submitting.set(true);
    this.usersApi
      .createUser({
        ...value,
        rol: USER_ROLES.User,
        createdBy: CURRENT_USER.id,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.submitting.set(false)),
      )
      .subscribe({
        next: () => {
          this.toast.show('Usuario creado correctamente.', 'success');
          this.userForm()?.reset();
          this.created.emit();
        },
      });
  }
}
