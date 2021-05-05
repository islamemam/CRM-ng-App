
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketTypesComponent } from './ticket-types/ticket-types.component';
import { OrganizationComponent } from './organizations/organizations.component';
import { NationalitiesComponent } from './nationalities/nationalities.component';
import { StatusComponent } from './status/status.component';
import { MainReasonComponent } from './main-reasons/main-reasons.component';
import { SubReasonComponent } from './sub-reasons/sub-reason.component';
import { TagComponent } from './tags/tags.component';
import { MergeReasonComponent } from './merge-reason/merge-reason.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { AutoResponseComponent } from './auto-response/auto-response.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: "prefix",
    children: [
      {
        path: 'organizations',
        pathMatch: "full",
        component: OrganizationComponent,
        data : ['Display Organizations']
      },
      {
        path: 'nationalities',
        pathMatch: "full",
        component: NationalitiesComponent,
        data : ['Display Nationalities']
      },
      {
        path: 'status',
        pathMatch: "full",
        component: StatusComponent,
        data : ['Display Statuses']
      },
      {
        path: 'tickettypes',
        pathMatch: "full",
        component: TicketTypesComponent,
        data : ['Display TicketTypes']
      },
      {
        path: 'mainreasons',
        pathMatch: "full",
        component: MainReasonComponent,
        data : ['Display MainReasons']
      },
      {
        path: 'subreasons',
        pathMatch: "full",
        component: SubReasonComponent,
        data : ['Display SubReasons']
      },
      {
        path: 'tags',
        pathMatch: "full",
        component: TagComponent,
        data : ['Display Tags']
      },
      {
        path: 'mergereasons',
        pathMatch: "full",
        component: MergeReasonComponent,
        data : ['Display MergeReasons']
      },
      {
        path: 'questionnaire',
        pathMatch: "full",
        component: QuestionnaireComponent
      }
      ,
      {
        path: 'auto-response',
        pathMatch: "full",
        component: AutoResponseComponent,
        // data : ['Display Nationalities'],
        // canActivate : [AuthGuard],
      }
    ]    

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LookupsRoutingModule { }
