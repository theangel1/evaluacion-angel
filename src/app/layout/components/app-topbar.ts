import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { StyleClassModule } from 'primeng/styleclass';
import { featherMenu } from '@ng-icons/feather-icons';
import { heroSun, heroMoon, heroInbox, heroUser } from '@ng-icons/heroicons/outline';
import { matPalette } from '@ng-icons/material-icons/baseline';
import { LayoutService } from '../core/services/layout-service';
import { TieredMenu } from 'primeng/tieredmenu';
import { Avatar } from "../../pages/shared/avatar/avatar";

@Component({
  selector: 'app-topbar',
  imports: [RouterModule, CommonModule, StyleClassModule, TieredMenu, Avatar],
  template: `
    <nav class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()"
            [ngClass]="{'active': isSidebarOpen}"
            >
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </button>
            <a class="layout-topbar-logo" routerLink="/">
              <img src="/logotipo-cf.svg" alt="Logo" />
            </a>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <!--<button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                    <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                    @if(layoutService.isDarkTheme()){
                      <ng-icon name="heroMoon"></ng-icon>
                    }@else {
                      <ng-icon name="heroSun"></ng-icon>
                    }
                </button>
                <div class="relative">
                    <button
                        class="layout-topbar-action layout-topbar-action-highlight"
                        pStyleClass="@next"
                        enterFromClass="hidden"
                        enterActiveClass="animate-scalein"
                        leaveToClass="hidden"
                        leaveActiveClass="animate-fadeout"
                        [hideOnOutsideClick]="true"
                    >
                        <ng-icon name="matPalette"></ng-icon>
                    </button>
                    <app-configurator />
                </div> -->
            </div>

            <button class="layout-topbar-menu-button layout-topbar-action" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="lg:block">
                <div class="layout-topbar-menu-content">
                    <div style="background-color: rgb(201, 83, 83);" class="h-12 w-12 rounded-full text-white flex items-center justify-center font-bold cursor-pointer">
                        <app-avatar />
                        <p-tieredmenu #menu [model]="items()" [popup]="true" styleClass="custom-menu"
                          [style]="{
                            'min-width': '220px',
                            'font-family': 'Inter, sans-serif'
                          }"
                        appendTo="body" />
                    </div>
                </div>
            </div>
        </div>
    </nav>
  `,
  providers: [
    provideIcons({
      featherMenu,
      heroSun,
      heroMoon,
      matPalette,
      heroInbox,
      heroUser
    })
  ]
})
export class AppTopbar{
  readonly items = computed(() => [
    {
      label: `<span class="font-bold">Tulio Triviño</span>`,
      icon: 'pi pi-user',
      styleClass: 'menu-header',
      disabled: true,
    },
    {
      label: 'Conductor',
      icon: 'pi pi-briefcase',
      styleClass: 'menu-subtitle',
      disabled: true,
    },
    {
      label: 'Mi perfil',
      icon: 'pi pi-building',
      disabled: true,
    },
    {
      separator: true
    },
    {
      label: 'Salir',
       icon: 'pi pi-sign-out',
      styleClass: 'menu-logout',
    }
  ]);

  constructor(
    public layoutService: LayoutService
  ) { }


  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
  }

  get isSidebarOpen(): boolean {
    const state = this.layoutService.layoutState();
    return state.overlayMenuActive || state.staticMenuMobileActive || !state.staticMenuDesktopInactive;
  }
}


