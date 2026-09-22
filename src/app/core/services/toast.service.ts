import { Injectable, signal } from '@angular/core';

export type ToastKind = 'success' | 'error';

export type ToastState = {
  text: string;
  kind: ToastKind;
};

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toast = signal<ToastState | null>(null);

  private clearTimer: ReturnType<typeof setTimeout> | null = null;

  show(text: string, kind: ToastKind = 'error'): void {
    this.clearTimerIfNeeded();
    this.toast.set({ text, kind });
    this.clearTimer = setTimeout(() => this.clear(), 3000);
  }

  clear(): void {
    this.clearTimerIfNeeded();
    this.toast.set(null);
  }

  private clearTimerIfNeeded(): void {
    if (this.clearTimer !== null) {
      clearTimeout(this.clearTimer);
      this.clearTimer = null;
    }
  }
}
