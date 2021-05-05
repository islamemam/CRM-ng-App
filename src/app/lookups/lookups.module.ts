import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LookupsRoutingModule } from './lookups-routing.module';
import { TicketTypesComponent } from './ticket-types/ticket-types.component';
import { NgbPaginationModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrganizationComponent } from './organizations/organizations.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NationalitiesComponent } from './nationalities/nationalities.component';
import { MainStatusComponent } from './main-statuses/main-statuses.component';
import { StatusComponent } from './status/status.component';
import { MainReasonComponent } from './main-reasons/main-reasons.component';
import { SubReasonComponent } from './sub-reasons/sub-reason.component';
import { TagComponent } from './tags/tags.component';
import { MergeReasonComponent } from './merge-reason/merge-reason.component';
import { QuestoinCategoryComponent } from './question-categories/question-category.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { QuestionTypeTextPipe } from './directives/question-type-text.pipe';
import { QuestionComponent } from './questions/questions.component';
import { AutoResponseComponent } from './auto-response/auto-response.component';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    TicketTypesComponent,
    OrganizationComponent,
    NationalitiesComponent,
    MainStatusComponent,
    StatusComponent,
    MainReasonComponent,
    SubReasonComponent,
    TagComponent,
    MergeReasonComponent,
    QuestoinCategoryComponent,
    QuestionnaireComponent,
    QuestionTypeTextPipe,
    QuestionComponent,
    AutoResponseComponent,
    
  ],
  imports: [
    //SharedModule,
    LookupsRoutingModule,
    ModalModule.forRoot(),
    CommonModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    
    TranslateModule
  ]
})
export class LookupsModule { }
