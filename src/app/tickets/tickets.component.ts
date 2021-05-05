import { Component } from '@angular/core';
import { AppBaseComponent } from '../base-omponent/app-base-component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ticket',
  template: `
    <router-outlet></router-outlet>
  `
})
export class TicketsComponent extends AppBaseComponent {

}
