import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ticket-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent extends AppBaseComponent implements OnInit {

  constructor(private translate: TranslateService) {
    super(translate);
  }

  ngOnInit() {
  }

}
