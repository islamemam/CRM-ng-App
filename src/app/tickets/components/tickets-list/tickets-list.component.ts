import { Component, OnInit, Input } from '@angular/core';
import { ApiResponse } from 'src/app/shared/models/api-response.model';
import { Ticket } from 'src/app/shared/models/ticket.model';
import { GenericCrudService } from 'src/app/shared/services/api/generic-crud.service';
import { GetStatusesService } from '../../../shared/services/api/ticketinfo/get-statuses.service';
import { ActivatedRoute } from '@angular/router';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent extends AppBaseComponent implements OnInit {
  public ticketsResponse: ApiResponse<Ticket[]>  =new ApiResponse<Ticket[]>() ;
  public pageSize :number = 5;

  public paginationMaxSize :number = 5;
  public isLoading = true;
  constructor(private  genericCrudService: GenericCrudService,
  private getStatuesService:GetStatusesService,
  private route:ActivatedRoute,
  private translate: TranslateService) {
    super(translate);
  }
  ticketId:any;
  statuses:any;
  response:any;
  @Input() ticketObject:any;
  ngOnInit() {    
    console.log(this.ticketObject);
    console.log('tickets');

    // this.genericCrudService.readAll<Ticket>(Ticket).subscribe(res => { 
    //   this.ticketsResponse=res; 
    //   this.isLoading=false; 

    // },e => console.log(e)
    //   );

    this.ticketId =  this.route.snapshot.paramMap.get('id');
    this.getStatuesService.getStatuesByTicketID(localStorage.getItem("token"),this.ticketId).subscribe(data =>{
      this.statuses = data["data"];
      this.response = data;
      console.log(this.statuses);
    })



    

  }

}
