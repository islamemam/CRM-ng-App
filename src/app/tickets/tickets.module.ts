import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import { TicketsMainComponent } from './components/tickets-component/tickets-component.component';
import { ClientInfoComponent } from './components/tickets-component/client-info/client-info.component';
import { TicketInfoComponent } from './components/tickets-component/ticket-info/ticket-info.component';
import { GetTicketsService } from '../shared/services/api/get-tickets.service';
import {addTicketsMainComponent} from './components/add-tickets-component/tickets-component.component';
import { FormsModule,ReactiveFormsModule  }   from '@angular/forms';
import {MatNativeDateModule, MatIconModule, MatChipsModule,MatAutocompleteModule, MatFormFieldModule,   MatProgressSpinnerModule, MatInputModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { AddTicketsTabsComponent } from './components/add-tickets-tabs/add-tickets-tabs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddTicketsReplyComponent } from './components/add-tickets-reply/add-tickets-reply.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TicketsListComponent } from './components/tickets-list/tickets-list.component';
import { KnowledgeBaseTabComponent } from './components/knowledge-base-tab/knowledge-base-tab.component';
import { ViewTicketDetailsComponent } from './components/view-ticket-details/view-ticket-details.component';
import { MergeTicketsComponent } from './components/tickets-component/merge-tickets/merge-ticket.component';
import { ModalModule } from 'ngx-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EditNoteModalComponent } from './components/edit-note-modal/edit-note-modal.component';
import { RepliesComponent } from './components/replies/replies.component';
import { TranslateService } from '@ngx-translate/core';


@NgModule({
  declarations: [
    TicketsComponent,
    TicketsMainComponent,
    ClientInfoComponent,
    TicketInfoComponent,
    addTicketsMainComponent,
    AddTicketsTabsComponent,
    AddTicketsReplyComponent,
    TicketsListComponent,
    KnowledgeBaseTabComponent,
    ViewTicketDetailsComponent,
    MergeTicketsComponent,
    EditNoteModalComponent,
    RepliesComponent,
    EditNoteModalComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    FormsModule,
    MatIconModule,
    MatNativeDateModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    TranslateModule, 
    MatProgressSpinnerModule,
     MatInputModule,
    NgbModule,
    ModalModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),

   
  ],
  providers: [GetTicketsService,TranslateService]
})
export class TicketsModule { }
