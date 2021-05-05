import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-client-add-edit',
  templateUrl: './client-add-edit.component.html',
  styleUrls: ['./client-add-edit.component.scss']
})
export class ClientAddEditComponent extends AppBaseComponent implements OnInit {

  constructor(public translate: TranslateService) {
    super(translate);
  }

  ngOnInit() {
  }

}
