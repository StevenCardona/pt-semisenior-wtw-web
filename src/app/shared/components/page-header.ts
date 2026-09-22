import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-page-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
        <svg
          class="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
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
