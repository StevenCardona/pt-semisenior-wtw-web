import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (toastService.toast(); as toast) {
      <div
        role="status"
        aria-live="polite"
        class="fixed bottom-4 right-4 z-50 max-w-sm rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg"
        [class.bg-emerald-600]="toast.kind === 'success'"
        [class.bg-red-600]="toast.kind === 'error'"
      >
        <div class="flex items-start gap-3">
          <p class="flex-1">{{ toast.text }}</p>
          <button
            type="button"
            class="shrink-0 rounded p-0.5 opacity-80 transition hover:opacity-100"
            aria-label="Cerrar notificación"
            (click)="toastService.clear()"
          >
            <svg
              class="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </div>
    }
  `,
})
export class Toast {
  readonly toastService = inject(ToastService);
}
