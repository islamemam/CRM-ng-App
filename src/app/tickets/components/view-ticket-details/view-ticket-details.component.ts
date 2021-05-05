import { Ticket } from 'src/app/shared/models/ticket.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetTicketService } from '../../../shared/services/api/ticketinfo/get-ticket.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GetServiceService } from '../../../shared/services/api/ticketinfo/get-service.service';
import { NgForm } from '@angular/forms';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-view-ticket-details',
  templateUrl: './view-ticket-details.component.html',
  styleUrls: ['./view-ticket-details.component.scss']
})



export class ViewTicketDetailsComponent extends AppBaseComponent implements OnInit {
 
  constructor(private translate: TranslateService) {
    super(translate);
  }

  ngOnInit() {

  }







}
