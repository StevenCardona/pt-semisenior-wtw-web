import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { RoleBadge } from '@shared/components/role-badge';
import { EmptyRow } from '@shared/table-skeleton/empty-row';
import { getInitials } from '@shared/utils/string.utils';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-users-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, EmptyRow, RoleBadge],
  templateUrl: './users-table.html',
})
export class UsersTable {
  readonly users = input.required<User[]>();
  readonly getInitials = getInitials;
}
