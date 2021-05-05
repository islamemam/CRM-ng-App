import { Component, OnInit, Input } from '@angular/core';
import { TicketFilterService } from 'src/app/shared/services/ticket-filter.service';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tickets-filter',
  templateUrl: './tickets-filter.component.html',
  styleUrls: ['./tickets-filter.component.scss']
})
export class TicketsFilterComponent extends AppBaseComponent implements OnInit {
  @Input('filter') filter: any;
  only_trashed_flag = 1;
  status_id = "";
  unassigned_flag = 1;
  resolved_at= new Date();
  unsolved_flag = 1;
  deletedTicketsStatistics: any;
  resolvedTicketsStatistics: any;
  unAssignedTicketsStatistics: any;
  unSolvedTicketsStatistics: any;
  viwetable: any;
  viewname: any;
  page_title = "TICKET.TICKET"
  todayDate:any;
  page = 1;
  constructor(private _TicketFilterService: TicketFilterService,
     private translate: TranslateService,
      private router: Router,
       private route: ActivatedRoute) {
    super(translate);

  }

  formatedDay(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    this.todayDate = yyyy + '-' + mm + '-' + dd ;
    console.log(this.todayDate)
  }

  ngOnInit() {
    this.page=1;
    this.formatedDay()
    this.route.queryParams.subscribe(params => {
      this.viewname = params["viewname"]
      this.status_id = params["status_id"]

      this.load(1)
    });



  }
  load(page){
    this.page = page;
    if (this.viewname == "delted-tickets") {
      this.loadDeletedTickets(this.only_trashed_flag);
      this.page_title = "TICKET.DELETED_TICKETS"
    }
    else if (this.viewname == "unassigned-tickets") {
      this.loadunAssignedTickets(this.unassigned_flag);
      this.page_title = "TICKET.WAITING_TICKETS"
    }
      else if (this.viewname == "due-date-tickets") {
      this.loadDueDateTickets(this.todayDate);
      this.page_title = "TICKET.due_date_tickets"
    }
    else if (this.viewname == "unsolved-tickets") {
      this.loadUnSolvedTickets(this.unsolved_flag);
      this.page_title = "TICKET.WAITING_TICKETS"
    } else {
      this.loadTicketsByStatus(this.status_id);
      this.page_title = this.status_id == "1" ? "TICKET.NEW_TICKETS" :
        this.status_id == "2" ? "TICKET.PENDING_TICKETS" :
          this.status_id == "3" ? "TICKET.SOLVED_TICKETS" : "TICKET.CLOSED_TICKETS";
    }
  }
  loadDeletedTickets(only_trashed_flag) {
    this._TicketFilterService.getDeletedTickets(only_trashed_flag, this.page)
      .subscribe(
        data => {
          this.viwetable = data;
        },
        erro => console.log(erro)
      );
  }

  loadTicketsByStatus(status_id) {
    this._TicketFilterService.getTicketsStatus(status_id, this.page)
      .subscribe(
        data => this.viwetable = data,
        erro => console.log(erro)
      );
  }

  loadunAssignedTickets(unassigned_flag) {
    this._TicketFilterService.getUnAssignedTickets(unassigned_flag, this.page)
      .subscribe(
        data => this.viwetable = data,
        erro => console.log(erro)
      );
  }
  loadDueDateTickets(resolved_at) {
    this._TicketFilterService.getDueDateTickets(resolved_at, this.page)
      .subscribe(
        data => this.viwetable = data,
        erro => console.log(erro)
      );
  }
  loadUnSolvedTickets(unsolved_flag) {
    this._TicketFilterService.getUnSolvedTickets(unsolved_flag, this.page)
      .subscribe(
        data => this.viwetable = data,
        erro => console.log(erro)
      );
  }
  ticketsPages(e) {
    this.page = parseInt(e.target.text);
    this.load(this.page);
  }

}
