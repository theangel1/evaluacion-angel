import { Component, ElementRef } from '@angular/core';
import { AppMenu } from './app-menu';
import { LayoutService } from '../core/services/layout-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
   imports: [AppMenu, CommonModule],
  template: `
    <div class="layout-sidebar" [ngClass]="{ 'active': isSidebarOpen }">
  <app-menu></app-menu>
</div>
  `,
})
export class AppSidebar {
 constructor(
    public el: ElementRef,
    public layoutService: LayoutService
  ) {}

  get isSidebarOpen(): boolean {
    const state = this.layoutService.layoutState();
    return state.overlayMenuActive || state.staticMenuMobileActive || !state.staticMenuDesktopInactive;
  }

}
