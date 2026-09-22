import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, RouterLink, RouterLinkActive],
  host: {
    class: 'block',
  },
  template: `
    <a
      [routerLink]="route()"
      routerLinkActive
      #link="routerLinkActive"
      [routerLinkActiveOptions]="{ exact: false }"
      class="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
      [ngClass]="
        link.isActive
          ? 'bg-brand-600 text-white'
          : 'text-slate-600 hover:bg-slate-200/70'
      "
      (click)="pressed.emit()"
    >
      <ng-content />
      <span>{{ label() }}</span>
    </a>
  `,
})
export class MenuItem {
  readonly label = input.required<string>();
  readonly route = input.required<string>();
  readonly pressed = output<void>();
}
