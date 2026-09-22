import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

function range(length: number): number[] {
  return Array.from({ length }, (_, i) => i);
}

@Component({
  selector: 'app-table-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
      role="status"
      aria-label="Cargando tabla"
    >
      <div class="overflow-x-auto">
        <table class="w-full min-w-[40rem] border-collapse text-left text-sm">
          <thead>
            <tr class="border-b border-slate-200 bg-slate-50">
              @for (col of columnIndexes(); track col) {
                <th class="px-4 py-3">
                  <div class="h-3 w-20 animate-pulse rounded bg-slate-200"></div>
                </th>
              }
            </tr>
          </thead>
          <tbody>
            @for (row of rowIndexes(); track row) {
              <tr class="border-b border-slate-100 last:border-b-0">
                @for (col of columnIndexes(); track col) {
                  <td class="px-4 py-4">
                    <div
                      class="h-4 animate-pulse rounded bg-slate-200"
                      [class.w-40]="col === 0"
                      [class.w-24]="col !== 0"
                    ></div>
                  </td>
                }
              </tr>
            }
          </tbody>
        </table>
      </div>
      <span class="sr-only">Cargando…</span>
    </div>
  `,
})
export class TableSkeleton {
  readonly rows = input(5);
  readonly columns = input(3);

  readonly rowIndexes = computed(() => range(this.rows()));
  readonly columnIndexes = computed(() => range(this.columns()));
}
