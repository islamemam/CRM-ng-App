import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './public/header/header.component';
import { SidebarComponent } from './public/sidebar/sidebar.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './public/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetTicketsService } from './shared/services/api/get-tickets.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FooterComponent } from './public/footer/footer.component';
import { KnowledgeBaseComponent } from './public/knowledge-base/knowledge-base.component';
import { KnowledgeBaseService } from './shared/services/knowledge-base.service';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './public/home/home.component';
import { UsersManagementComponent } from './public/users-management/users-management.component';
import { UserManagementService } from './shared/services/user-management.service';
import { WorkFlowManagementComponent } from './public/workflow-manegement/workflow-manegement.component';
import { AddEditSLA } from './public/workflow-manegement/add-edit-SLA/add-edit-SLA.component';
import { WorkFlowService } from './shared/services/api/workflow/workflow.service';
import { NumberDirective } from './shared/directives/numbers-only.directive';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AddEditBusenissRole } from './public/workflow-manegement/add-edit-buseniss-role/add-edit-buseniss-role.component';
import { BusenissRoleManegement } from './public/workflow-manegement/buseniss-role-manegement/buseniss-role-manegement.component';
import { ResuableEscalationComponent } from './public/workflow-manegement/escalation-component/reusable-escalation-component';
import { ChartsModule } from 'ng2-charts';
import { UserGroupsService } from './shared/services/user-groups.service';
import { confirmEqualValidator } from './shared/confirmEqualValidator.directive'
import { from } from 'rxjs';
import { DashboardService } from './shared/services/dashboard.service';
import { MyFilterPipe } from './shared/pipes/MyFilterPipe.pipe';
import { ProcSectionComponent } from './public/workflow-manegement/add-edit-buseniss-role/proc-section/proc-section.component';
import { SLAManegement } from './public/workflow-manegement/sla-management/sla-manegement.component';
import { TicketFilterService } from './shared/services/ticket-filter.service';
import { ProcSLAAectionComponent } from './public/workflow-manegement/proc-section-add-sla/proc-section-add-sla.component';
import { AppBaseComponent } from './base-omponent/app-base-component';
import { httpSetHeaders } from './Interceptor/httpSetHeaders';
import { SearchResultComponent } from './public/search-result/search-result.component';
import { AppSearchService } from './shared/services/app-search.service';
import { ReportsComponent } from './public/reports/reports.component';
import { ReportDetailsComponent } from './public/report-details/report-details.component';
import { TicketsFilterComponent } from './public/tickets-Filter/tickets-filter/tickets-filter.component';
import { UserProfileComponent } from './public/user-profile/user-profile.component';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppBaseComponent,
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    FooterComponent,
    KnowledgeBaseComponent,
    HomeComponent,
    UsersManagementComponent,
    WorkFlowManagementComponent,
    AddEditSLA,
    AddEditBusenissRole,
    NumberDirective,
    BusenissRoleManegement,
    ResuableEscalationComponent,
    confirmEqualValidator,
    MyFilterPipe,
    ProcSectionComponent,
    SLAManegement,
    ProcSLAAectionComponent,
    SearchResultComponent,
    ReportsComponent,
    ReportDetailsComponent,
    TicketsFilterComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    ChartsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxDatatableModule,NgbPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    })


  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: httpSetHeaders, multi: true }, GetTicketsService, KnowledgeBaseService, UserManagementService, UserGroupsService, WorkFlowService, DashboardService,TicketFilterService,AppSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
