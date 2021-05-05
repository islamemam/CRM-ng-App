import { Component } from '@angular/core';
import { AppBaseComponent } from '../base-omponent/app-base-component';

@Component({
  selector: 'app-client',
  template: `
    <router-outlet></router-outlet>
  `
})
export class ClientComponent extends AppBaseComponent {

}
