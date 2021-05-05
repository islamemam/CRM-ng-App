import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends AppBaseComponent implements OnInit {

  constructor(private translate: TranslateService) {
    super(translate);
  }

  ngOnInit() {
  }

}
