import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

import { PageHeader } from '@shared/components/page-header';
import { TableSkeleton } from '@shared/table-skeleton/table-skeleton';

import { CreateUserModal } from '../components/modals/create-user-modal';
import { UsersTable } from '../components/table/users-table';
import { User } from '../models/user.model';
import { UsersApiService } from '../services/users-api.service';

@Component({
  selector: 'app-users-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeader, TableSkeleton, UsersTable, CreateUserModal],
  templateUrl: './users-page.html',
})
export class UsersPage implements OnInit {
  private readonly usersApi = inject(UsersApiService);
  private readonly destroyRef = inject(DestroyRef);

  readonly users = signal<User[]>([]);
  readonly loading = signal(true);
  readonly createOpen = signal(false);

  ngOnInit(): void {
    this.loadUsers();
  }

  onUserCreated(): void {
    this.createOpen.set(false);
    this.loadUsers();
  }

  private loadUsers(): void {
    this.loading.set(true);
    this.usersApi
      .getUsers()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        next: (users) => this.users.set(users),
        error: () => this.users.set([]),
      });
  }
}
