import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { finalize } from 'rxjs';

import { ToastService } from '@core/services/toast.service';
import { UsersSelector } from '@features/users/components/selector/users-selector';
import { User } from '@features/users/models/user.model';
import { UsersApiService } from '@features/users/services/users-api.service';
import {
  TASK_STATUSES,
  TaskStatus,
} from '@shared/constants/task-status.constants';
import { CURRENT_USER } from '@shared/constants/current-user';
import { PageHeader } from '@shared/components/page-header';
import { TableSkeleton } from '@shared/table-skeleton/table-skeleton';

import { CreateTaskModal } from '../components/modals/create-task-modal';
import { TasksTable } from '../components/table/tasks-table';
import { Task } from '../models/task.model';
import { TasksApiService } from '../services/tasks-api.service';

const DEFAULT_ORDER_BY = 'createdDate';

type TaskFilters = {
  userId: number | null;
  status: string;
  orderBy: string;
};

@Component({
  selector: 'app-tasks-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PageHeader,
    TableSkeleton,
    TasksTable,
    CreateTaskModal,
    UsersSelector,
  ],
  templateUrl: './tasks-page.html',
})
export class TasksPage implements OnInit {
  private readonly tasksApi = inject(TasksApiService);
  private readonly usersApi = inject(UsersApiService);
  private readonly toast = inject(ToastService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly tasks = signal<Task[]>([]);
  readonly users = signal<User[]>([]);
  readonly loading = signal(true);
  readonly createOpen = signal(false);
  readonly advancingId = signal<number | null>(null);

  readonly filterUserId = signal<number | null>(null);
  readonly filterStatus = signal<string>('');
  readonly filterOrderBy = signal(DEFAULT_ORDER_BY);

  readonly statusOptions = [
    { value: '', label: 'Todos' },
    { value: TASK_STATUSES.Pending, label: 'Pendiente' },
    { value: TASK_STATUSES.InProgress, label: 'En progreso' },
    { value: TASK_STATUSES.Done, label: 'Completada' },
  ] as const;

  readonly orderByOptions = [
    { value: 'createdDate', label: 'Fecha de creación' },
    { value: 'status', label: 'Estado' },
  ] as const;

  ngOnInit(): void {
    this.loadUsers();
    this.syncFiltersFromUrl();
  }

  onTaskCreated(): void {
    this.createOpen.set(false);
    this.loadTasks();
  }

  onFilterUserChange(userId: number | null): void {
    this.applyFilters({
      userId,
      status: userId == null ? '' : this.filterStatus(),
      orderBy: this.filterOrderBy(),
    });
  }

  onFilterStatusChange(event: Event): void {
    const status = (event.target as HTMLSelectElement).value;
    this.applyFilters({
      userId: this.filterUserId(),
      status,
      orderBy: this.filterOrderBy(),
    });
  }

  onFilterOrderByChange(event: Event): void {
    const orderBy =
      (event.target as HTMLSelectElement).value || DEFAULT_ORDER_BY;
    this.applyFilters({
      userId: this.filterUserId(),
      status: this.filterStatus(),
      orderBy,
    });
  }

  onAdvanceStatus(event: { id: number; status: TaskStatus }): void {
    if (this.advancingId() != null) {
      return;
    }

    this.advancingId.set(event.id);
    this.tasksApi
      .changeStatus(event.id, {
        status: event.status,
        updatedBy: CURRENT_USER.id,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.advancingId.set(null)),
      )
      .subscribe({
        next: () => {
          this.toast.show('Estado actualizado correctamente.', 'success');
          this.loadTasks();
        },
      });
  }

  private syncFiltersFromUrl(): void {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const filters = this.readFiltersFromParams(params);
        const missingKeys =
          !params.has('userId') ||
          !params.has('status') ||
          !params.has('orderBy');

        if (missingKeys) {
          void this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
              userId: filters.userId ?? '',
              status: filters.status,
              orderBy: filters.orderBy,
            },
            replaceUrl: true,
          });
          return;
        }

        this.filterUserId.set(filters.userId);
        this.filterStatus.set(filters.status);
        this.filterOrderBy.set(filters.orderBy);
        this.loadTasks();
      });
  }

  private readFiltersFromParams(params: ParamMap): TaskFilters {
    const userIdRaw = params.get('userId') ?? '';
    const parsedUserId = userIdRaw ? Number(userIdRaw) : null;

    return {
      userId:
        parsedUserId != null && !Number.isNaN(parsedUserId)
          ? parsedUserId
          : null,
      status: params.get('status') ?? '',
      orderBy: params.get('orderBy') || DEFAULT_ORDER_BY,
    };
  }

  private applyFilters(filters: TaskFilters): void {
    const status = filters.userId == null ? '' : filters.status;

    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        userId: filters.userId ?? '',
        status,
        orderBy: filters.orderBy || DEFAULT_ORDER_BY,
      },
    });
  }

  private loadUsers(): void {
    this.usersApi
      .getUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (users) => this.users.set(users),
        error: () => this.users.set([]),
      });
  }

  private loadTasks(): void {
    this.loading.set(true);

    const userId = this.filterUserId();
    const orderBy = this.filterOrderBy();
    const status = this.filterStatus() as TaskStatus | '';

    const request$ =
      userId != null
        ? this.tasksApi.getTasksByUser({
            userId,
            status: status || null,
            orderBy,
          })
        : this.tasksApi.getTasks({ orderBy });

    request$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        next: (tasks) => this.tasks.set(tasks),
        error: () => this.tasks.set([]),
      });
  }
}
