import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-credit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p class="text-[11px] text-slate-400">Creado por Steven Cardona | V1</p>
  `,
})
export class SidebarCredit {}
