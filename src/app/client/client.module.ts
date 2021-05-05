import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientComponent } from './client.component';
import { ClientAddEditComponent } from './client-add-edit/client-add-edit.component';
import { ClientsComponent } from './clients/clients.component';
import { NgbdSortableHeader } from './clients/sortable.directive';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    ClientComponent,
    ClientAddEditComponent,
    ClientsComponent,
    NgbdSortableHeader
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule
  ],

})
export class ClientModule { 
}
