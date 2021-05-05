import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';
import { ClientsComponent } from './clients/clients.component';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: "prefix",
    component: ClientComponent,
    data : ['Display Clients'],
    canActivate : [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: "full",
        component: ClientsComponent,
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
