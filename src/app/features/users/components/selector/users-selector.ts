import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-users-selector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './users-selector.html',
})
export class UsersSelector {
  readonly users = input.required<User[]>();
  readonly selectedId = input<number | null>(null);
  readonly selectionChange = output<number | null>();

  onChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectionChange.emit(value === '' ? null : Number(value));
  }
}
