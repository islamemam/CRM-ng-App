import { Component } from '@angular/core';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketTypeService } from 'src/app/shared/services/ticket-type/ticket-type.service';
import { TranslateService } from '@ngx-translate/core';



@Component({
    selector: 'app-ticket-type',
    templateUrl: './ticket-types.component.html'
  })

export class TicketTypesComponent extends AppBaseComponent {
    dataLoded = true;
    mainStatusObj = null;
    pageSize = 10;
    paginationMaxSize = 10;
    addHospitalSpinner = false;
    haserror:boolean=false;
    submitted = false;
    displayTitleArErrorDuplication = false;
    displayTitleEnErrorDuplication = false;
    ticketTypeId = 0;

    addTicketTypeForm = new FormGroup({
        title_ar : new FormControl('', [Validators.required, Validators.minLength(3)]),
        title_en : new FormControl('', [Validators.required, Validators.minLength(3)]),
      });

    constructor(private ticketTypeService: TicketTypeService,
                private modalService: NgbModal,
                private translate: TranslateService) {
                  super(translate);
    }
    ngOnInit(){
        this.getAll(1);
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

    addStatus(){
      this.submitted = true;
      if(this.addTicketTypeForm.status != "VALID"){
        return;
      }
        let model = this.addTicketTypeForm.value;
        if(this.ticketTypeId == 0){
              this.ticketTypeService.save(model).subscribe(res => {
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
          this.ticketTypeService.update(this.ticketTypeId, model).subscribe(res => {
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
      this.ticketTypeId = 0;
      this.addTicketTypeForm.reset();
    }

    getbyId(id, content){
      this.ticketTypeService.getbyId(id).subscribe(res => {
        this.addTicketTypeForm.controls["title_ar"].setValue(res["title_ar"]);
        this.addTicketTypeForm.controls["title_en"].setValue(res["title_en"]);
        this.ticketTypeId = id;
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          }, (reason) => {
          });
      });
    }

    close(){
      this.ticketTypeId = 0;
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
        this.ticketTypeService.getAll(pageNumber).subscribe(res => {
            this.mainStatusObj = res;
        })
      }

      delete(id){
          this.ticketTypeService.delete(id).subscribe(res => {
            this.getAll(1);
          });
      }
}