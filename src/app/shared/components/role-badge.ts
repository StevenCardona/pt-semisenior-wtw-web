import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { roleLabel, UserRole } from '@shared/constants/app.constants';

@Component({
  selector: 'app-role-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium"
      [class.bg-brand-50]="rol() === 'admin'"
      [class.text-brand-700]="rol() === 'admin'"
      [class.bg-slate-100]="rol() !== 'admin'"
      [class.text-slate-700]="rol() !== 'admin'"
    >
      {{ label() }}
    </span>
  `,
})
export class RoleBadge {
  readonly rol = input.required<UserRole | string>();

  readonly label = computed(() => roleLabel(this.rol()));
}
