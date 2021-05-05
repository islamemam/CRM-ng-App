import { Component } from '@angular/core';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StatusService } from 'src/app/shared/services/status/status.service';
import { MainStatusService } from 'src/app/shared/services/main-status/main-status.service';
import { TranslateService } from '@ngx-translate/core';



@Component({
    selector: 'app-statuses',
    templateUrl: './status.component.html'
  })

export class StatusComponent extends AppBaseComponent {
    spinnerLoaded = false;
    statusObj = null;
    pageSize = 10;
    paginationMaxSize = 10;
    haserror:boolean=false;
    submitted = false;
    addclienterrormsg:any;
    alreadytaken = false;
    errorarrays:any;
    displayTitleArErrorDuplication = false;
    displayTitleEnErrorDuplication = false;
    statusId = 0;
    mainStatus : any[];


    addStatusForm = new FormGroup({
        title_ar : new FormControl('', [Validators.required, Validators.minLength(3)]),
        title_en : new FormControl('', [Validators.required, Validators.minLength(3)]),
        main_status_id : new FormControl('', [Validators.required, Validators.pattern('^[1-9]\d*$')]),
      });

    constructor(private statusService: StatusService,
                private modalService: NgbModal,
                private mainStatusService: MainStatusService,
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

    addStatus(){
      this.submitted = true;
      this.spinnerLoaded = true;
      if(this.addStatusForm.status != "VALID"){
        this.spinnerLoaded = false;
        return;
      }
        let model = this.addStatusForm.value;
        if(this.statusId == 0){
              this.statusService.save(model).subscribe(res => {
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
          this.statusService.update(this.statusId, model).subscribe(res => {
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
      this.addStatusForm.reset();
    }

    getbyId(id, content){
      this.spinnerLoaded = false;
      this.statusService.getbyId(id).subscribe(res => {
        this.addStatusForm.controls["title_ar"].setValue(res["title_ar"]);
        this.addStatusForm.controls["title_en"].setValue(res["title_en"]);
        this.addStatusForm.controls["main_status_id"].setValue(res["main_status_id"]);
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
        this.spinnerLoaded = true;
        this.statusService.getAll(pageNumber).subscribe(res => {
            this.statusObj = res;
            this.spinnerLoaded = false;
        })
      }

      delete(id){
          this.statusService.delete(id).subscribe(res => {
            this.getAll(1);
          });
      }
      getMainStatuses(){
          this.mainStatusService.getAll(1).subscribe(res => {
            this.mainStatus = res['data'];
          })
      }
}