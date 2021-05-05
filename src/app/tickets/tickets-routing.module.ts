
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketsComponent } from './tickets.component';
import { TicketsMainComponent } from './components/tickets-component/tickets-component.component';
import {addTicketsMainComponent} from'./components/add-tickets-component/tickets-component.component'
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch:"prefix",
    component: TicketsComponent,
    data : ['Display Ticket'],
    children: [
      {
        path: '',
        pathMatch: "full",
        component: TicketsMainComponent,
        data : ['Display Ticket'],
        canActivate : [AuthGuard]
      },
      {
        path: 'add-ticket',
        pathMatch: "full",
        component: addTicketsMainComponent,
        data : ['Add Ticket'],
        canActivate : [AuthGuard]
      },
      {
        path: 'add-ticket/:id',
        pathMatch: "full",
        component: addTicketsMainComponent,
        data : ['Edit Ticket'],
        canActivate : [AuthGuard]
      },
    
    ]
  }

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
