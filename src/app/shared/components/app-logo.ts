import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideCheck } from '@lucide/angular';

import { APP_NAME } from '@shared/constants/app-name.constants';

@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideCheck],
  template: `
    <div class="flex items-center gap-2.5">
      <span
        class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white"
        aria-hidden="true"
      >
        <svg lucideCheck [size]="16" class="size-4"></svg>
      </span>
      @if (showText()) {
        <span class="text-lg font-bold tracking-tight text-ink">{{
          appName
        }}</span>
      }
    </div>
  `,
})
export class AppLogo {
  readonly showText = input(true);
  readonly appName = APP_NAME;
}
