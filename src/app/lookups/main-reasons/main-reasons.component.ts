import { Component } from '@angular/core';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketTypeService } from 'src/app/shared/services/ticket-type/ticket-type.service';
import { MainReasonService } from 'src/app/shared/services/main-reason/main-reason.service';
import { TranslateService } from '@ngx-translate/core';



@Component({
    selector: 'app-main-reasons',
    templateUrl: './main-reasons.component.html'
  })

export class MainReasonComponent extends AppBaseComponent {
    dataLoded = true;
    statusObj = null;
    pageSize = 10;
    paginationMaxSize = 10;
    submitted = false;
    displayTitleArErrorDuplication = false;
    displayTitleEnErrorDuplication = false;
    statusId = 0;
    ticketTypesList : any[];
    spinnerLoaded = false;


    addmainReasonForm = new FormGroup({
        title_ar : new FormControl('', [Validators.required, Validators.minLength(3)]),
        title_en : new FormControl('', [Validators.required, Validators.minLength(3)]),
        ticket_type_id : new FormControl('', [Validators.required, Validators.pattern('^[1-9]\d*$')]),
      });

    constructor(private mainReasonService: MainReasonService,
                private modalService: NgbModal,
                private ticketTypeService: TicketTypeService,
                private translate: TranslateService) {
        super(translate);
        
    }
    ngOnInit(){
        this.getAll(1);
        this.getMainStatuses();
    }

    onpageChange(pageNumber){
        this.getAll(pageNumber);
    }

    englishTitleChange(){
      this.displayTitleEnErrorDuplication = false;
    }

    arabicTitleChange(){
      this.displayTitleArErrorDuplication = false;
    }
    onChange($event){

    }

    addMainReason(){
      this.submitted = true;
      this.spinnerLoaded = true;
      if(this.addmainReasonForm.status != "VALID"){
        this.spinnerLoaded = false;
        return;
      }
        let model = this.addmainReasonForm.value;
        if(this.statusId == 0){
              this.mainReasonService.save(model).subscribe(res => {
                this.close();
                this.getAll(1);
            }, error => {
              if(error["status"] == "422"){
                let allerrors = error.error.errors
                let errordexcripteveList = Object.keys(allerrors);
                this.displayErrors(errordexcripteveList);
              }
            });
        }else{
          this.mainReasonService.update(this.statusId, model).subscribe(res => {
            this.close();
            this.getAll(1);
          }, error => {
            if(error["status"] == "422"){
              let allerrors = error.error.errors
              let errordexcripteveList = Object.keys(allerrors);
              this.displayErrors(errordexcripteveList);
            }
          });
        }

    }

    displayErrors(errordexcripteveList: any[]){
      this.spinnerLoaded = false;
      if(errordexcripteveList.find(f => f == 'title_ar') != null){
        this.displayTitleArErrorDuplication = true;
      }else{
        this.displayTitleArErrorDuplication = false;
      }

      if(errordexcripteveList.find(f => f == 'title_en') != null){
        this.displayTitleEnErrorDuplication = true;
      }else{
        this.displayTitleEnErrorDuplication = false;
      }
    }

    clearData(){
      this.submitted = false;
      this.statusId = 0;
      this.spinnerLoaded = false;
      this.addmainReasonForm.reset();
    }

    getbyId(id, content){
      this.spinnerLoaded = false;
      this.mainReasonService.getbyId(id).subscribe(res => {
        this.addmainReasonForm.controls["title_ar"].setValue(res["title_ar"]);
        this.addmainReasonForm.controls["title_en"].setValue(res["title_en"]);
        this.addmainReasonForm.controls["ticket_type_id"].setValue(res["ticket_type_id"]);
        this.statusId = id;
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          }, (reason) => {
          });
      });
    }

    close(){
      this.statusId = 0;
      this.modalService.dismissAll();
    }

    openDeleteConfirmation(content, id, $event){
        $event.preventDefault();
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
                if(result == 'Save'){
                  this.delete(id);
                }
              }, (reason) => {
            });
    }

    openAddEdit(content) {
      this.clearData();
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        }, (reason) => {
        });
      }

    getAll(pageNumber){
        this.mainReasonService.getAll(pageNumber).subscribe(res => {
            this.statusObj = res;
        })
      }

      delete(id){
          this.mainReasonService.delete(id).subscribe(res => {
            this.getAll(1);
          });
      }
      getMainStatuses(){
          this.ticketTypeService.getAll(1).subscribe(res => {
            this.ticketTypesList = res['data'];
          })
      }
}