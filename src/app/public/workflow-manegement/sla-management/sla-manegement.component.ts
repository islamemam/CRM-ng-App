import { Component, OnInit } from '@angular/core';
import { WorkFlowService } from 'src/app/shared/services/api/workflow/workflow.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'sla-manegement',
    templateUrl: './sla-manegement.component.html'
  })
  
  export class SLAManegement extends AppBaseComponent implements OnInit {
    token : string;
    slaList = [];
    page = 0;
    total = 0;
    slaData : any;
    pageSize = 5;
    paginationMaxSize = 5;
    clientsObjectSpinner = true;
    dataLoded = false;
    ngOnInit(): void {
      this.token = localStorage.getItem('token');
      this.getAllSla();
    }

    constructor(private workFlowService: WorkFlowService,
      private modalService: NgbModal,
      private translate: TranslateService){
      super(translate);
    }

    preventNavigation($event){
      $event.preventDefault();
    }

    deleteSLA(id){
      //this.slaList = this.slaList.filter(f => f.id != id);
      this.workFlowService.deleteSLA(this.token,id).subscribe(f => {
        this.getAllSla();
      });
    }

    open(content, id, $event) {
      $event.preventDefault();
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        if(result == 'Save'){
          this.deleteSLA(id);
        }
      }, (reason) => {

      });
    }

  

    displayDataFun( id){
      let item = this.slaList.find(f => f.id == id);
      if(item != null){
        item.displayData = !item.displayData;
      }
    }

    getAllSla(){
      this.workFlowService.getAllSla(this.token).subscribe(f => {
        this.slaData = f;
        this.slaList = f["data"];
        for (let index = 0; index < this.slaList.length; index++) {
          const element = this.slaList[index];
          element.displayData = false;
        }
        this.dataLoded = true;
      })
    }

  }