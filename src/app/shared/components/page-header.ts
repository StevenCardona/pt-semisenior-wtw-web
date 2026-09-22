import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { LucidePlus } from '@lucide/angular';

@Component({
  selector: 'app-page-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucidePlus],
  template: `
    <header
      class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      <div class="min-w-0 space-y-1">
        <p
          class="text-xs font-semibold uppercase tracking-wider text-slate-500"
        >
          {{ subtitle() }}
        </p>
        <h1 class="text-2xl font-bold tracking-tight text-ink">
          {{ title() }}
        </h1>
      </div>

      <button
        type="button"
        class="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        (click)="buttonClick.emit()"
      >
        <svg lucidePlus [size]="16" class="size-4"></svg>
        {{ buttonLabel() }}
      </button>
    </header>
  `,
})
export class PageHeader {
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();
  readonly buttonLabel = input.required<string>();
  readonly buttonClick = output<void>();
}
