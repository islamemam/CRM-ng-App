import { Component } from '@angular/core';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
    selector: 'app-questionnaire',
    templateUrl: './questionnaire.component.html'
  })

export class QuestionnaireComponent extends AppBaseComponent {


    onTabChange($event){
        //this.selectedTab = $event.nextId;
      }
}
