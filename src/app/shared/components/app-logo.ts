import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center gap-2.5">
      <span
        class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white"
        aria-hidden="true"
      >
        <svg
          class="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      </span>
      @if (showText()) {
        <span class="text-lg font-bold tracking-tight text-ink">TaskFlow</span>
      }
    </div>
  `,
})
export class AppLogo {
  readonly showText = input(true);
}
