import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.scss']
})
export class TicketInfoComponent extends AppBaseComponent implements OnInit {

  constructor(private translate: TranslateService) {
    super(translate);
  }

  ngOnInit() {
  }

}
