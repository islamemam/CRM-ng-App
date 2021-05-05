import { Component, OnInit, Input } from '@angular/core';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { GetRepliesService } from 'src/app/shared/services/api/ticketinfo/get-replies.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-replies-component',
    templateUrl: './replies.component.html',
  })

  export class RepliesComponent extends AppBaseComponent implements OnInit   {
    ticketId = 0; 
    constructor(private getRepliesService : GetRepliesService,
                private _activatedRoute: ActivatedRoute,
                private translate: TranslateService){
        super(translate);
        if(this._activatedRoute.snapshot.paramMap.get("id") !){
          this.ticketId = +this._activatedRoute.snapshot.paramMap.get("id");
        }
    }


    ngOnInit(){
      this.getReplies();
    }

    getReplies(){
      console.log('ticketID', this.ticketId);
      if(this.ticketId > 0){
        this.getRepliesService.getRepliesBasedOnTicketId(this.ticketId).subscribe(
          res => {
            console.log('replies', res);
          }
        );
      }
    }
    
  }