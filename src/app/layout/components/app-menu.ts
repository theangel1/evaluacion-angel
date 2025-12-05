import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppMenuitem } from './app-menuitem';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, AppMenuitem, RouterModule],
  providers: [],
  template: `
    <ul class="layout-menu">
      <ng-container *ngFor="let item of model; let i = index">
        <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
        <li *ngIf="item.separator" class="menu-separator"></li>
      </ng-container>
    </ul>`,
})
export class AppMenu {

private messageService = inject(MessageService);

  constructor(
  ) {}

  public loading  : boolean = false;

  model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'HOME',
                items:
                [
                  {
                    label: 'Home',
                    ngIconSet: 'hero',
                    ngIconName: 'home',
                    icon: 'pi pi-fw pi-home',
                    routerLink: ['/']
                  }
                ]
            },
              {
                label: 'Rick and Morty',
                items:
                [
                  {
                    label: 'Lista de Urls',
                    ngIconSet: 'hero',
                    ngIconName: 'listBullet',                    
                    routerLink: ['/urls']
                  },
                   {
                    label: 'Personajes',
                    ngIconSet: 'hero',
                    ngIconName: 'users',                    
                    routerLink: ['/characters']
                  },
                  {
                    label: 'Lugares',
                    ngIconSet: 'hero',
                    ngIconName: 'mapPin',                    
                    routerLink: ['/locations']
                  },
                  
                ]
            },
            {
                label: 'ADICIONALES',
                items:
                [
                    {
                      label: 'Aprovechemos este espacio',
                      ngIconSet: 'remixicon',
                      ngIconName: 'FileExcel2Line',
                      icon: 'pi pi-fw ri-file-excel-2-line',
                      command: () => this.messageService.add({severity:'success', summary:'Éxito', detail:'Hagamos algo interesante con esto'})
                    },
                ]
            },
        ];
    }
}
