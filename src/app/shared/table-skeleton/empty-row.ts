import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'tr[app-empty-row]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <td
      [attr.colspan]="colspan()"
      class="px-4 py-12 text-center text-sm text-slate-500"
    >
      {{ message() }}
    </td>
  `,
})
export class EmptyRow {
  readonly colspan = input(3);
  readonly message = input('No hay usuarios');
}
