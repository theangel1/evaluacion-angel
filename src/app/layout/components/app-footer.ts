import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <div class="layout-footer">
      <a class="layout-footer-logo" routerLink="/">
        <img src="/logotipo-cf.svg" alt="Logo" />
      </a>
    </div>
  `,

})
export class AppFooter {

}
