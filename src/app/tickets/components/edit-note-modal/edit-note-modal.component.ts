import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-note-modal',
  templateUrl: './edit-note-modal.component.html',
  styleUrls: ['./edit-note-modal.component.scss']
})
export class EditNoteModalComponent extends AppBaseComponent implements OnInit {

  constructor(private translate: TranslateService) {
    super(translate);
  }

  ngOnInit() {
  }

}
