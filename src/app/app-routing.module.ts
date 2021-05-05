import { LoginComponent } from './public/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KnowledgeBaseComponent } from './public/knowledge-base/knowledge-base.component';
import { HomeComponent } from './public/home/home.component';
import { UsersManagementComponent } from './public/users-management/users-management.component';
import { WorkFlowManagementComponent } from './public/workflow-manegement/workflow-manegement.component';
import { AddEditBusenissRole } from './public/workflow-manegement/add-edit-buseniss-role/add-edit-buseniss-role.component';
import { AddEditSLA } from './public/workflow-manegement/add-edit-SLA/add-edit-SLA.component';
import { AuthGuard } from './guards/auth.guard';
import { SearchResultComponent } from './public/search-result/search-result.component';
import {ReportsComponent} from './public/reports/reports.component';
import {ReportDetailsComponent} from './public/report-details/report-details.component';
import { TicketsFilterComponent } from './public/tickets-Filter/tickets-filter/tickets-filter.component';
import { UserProfileComponent } from './public/user-profile/user-profile.component';
const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   //redirectTo:
  // },
  {
    path: 'lookups',
    pathMatch: 'prefix',
    loadChildren: () => import('./lookups/lookups.module').then(m => m.LookupsModule)
  },
  {
    path: 'clients',
    pathMatch: 'prefix',
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
  },
  {
    path: 'tickets',
    pathMatch: 'prefix',
    loadChildren: () => import('./tickets/tickets.module').then(m => m.TicketsModule)
  },
  {
    path: 'hollatfrontend',
    pathMatch: 'prefix',
    loadChildren: () => import('./tickets/tickets.module').then(m => m.TicketsModule)
  },
  {path: 'login', component: LoginComponent},
  {path: 'kn-base', component: KnowledgeBaseComponent, canActivate:[AuthGuard], data: ['Display KnBase']},
  {path: 'reports', component: ReportsComponent},
  {path: 'report-details',component: ReportDetailsComponent , data: ['Display reports']},


  {path: 'home', component:HomeComponent},
  {path: 'search-result', component:SearchResultComponent},
  {path: 'user-management', component:UsersManagementComponent, canActivate:[AuthGuard], data: ['Display Users']},
  {path: 'workflow-management', component:WorkFlowManagementComponent},
  {path: 'sla', component:AddEditSLA, canActivate:[AuthGuard], data: ['Add SLA']},
  {path: 'sla/:id', component:AddEditSLA, canActivate:[AuthGuard], data: ['Edit SLA']},
  {path: 'business-role', component:AddEditBusenissRole, canActivate:[AuthGuard], data: ['Add Business Rules']},
  {path: 'business-role/:id', component:AddEditBusenissRole, canActivate:[AuthGuard], data: ['Edit Business Rules']},
  {path: 'tickets-filter', component:TicketsFilterComponent},
  {path: 'user-profile', component:UserProfileComponent},
  {path: '', component:HomeComponent},
  {path: '**', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
