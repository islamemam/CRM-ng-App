import { Component } from '@angular/core';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubReasonService } from 'src/app/shared/services/sub-reason/sub-reason.service';
import { MainReasonService } from 'src/app/shared/services/main-reason/main-reason.service';
import { TranslateService } from '@ngx-translate/core';



@Component({
    selector: 'app-sub-reason',
    templateUrl: './sub-reason.component.html'
  })

export class SubReasonComponent extends AppBaseComponent {
    subReasonObj = null;
    pageSize = 10;
    paginationMaxSize = 10;
    submitted = false;
    displayTitleArErrorDuplication = false;
    displayTitleEnErrorDuplication = false;
    statusId = 0;
    mainReasonList : any[];
    spinnerLoaded = false;


    addSubReasonForm = new FormGroup({
        title_ar : new FormControl('', [Validators.required, Validators.minLength(3)]),
        title_en : new FormControl('', [Validators.required, Validators.minLength(3)]),
        main_reason_id : new FormControl('', [Validators.required, Validators.pattern('^[1-9]\d*$')]),
      });

    constructor(private subReasonService: SubReasonService,
                private modalService: NgbModal,
                private mainReasonService: MainReasonService,
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

    addSubReason(){
      this.submitted = true;
      this.spinnerLoaded = true;
      if(this.addSubReasonForm.status != "VALID"){
        this.spinnerLoaded = false;
        return;
      }
        let model = this.addSubReasonForm.value;
        if(this.statusId == 0){
              this.subReasonService.save(model).subscribe(res => {
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
          this.subReasonService.update(this.statusId, model).subscribe(res => {
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
      this.addSubReasonForm.reset();
    }

    getbyId(id, content){
        this.spinnerLoaded = false;
      this.subReasonService.getbyId(id).subscribe(res => {
        this.addSubReasonForm.controls["title_ar"].setValue(res["title_ar"]);
        this.addSubReasonForm.controls["title_en"].setValue(res["title_en"]);
        this.addSubReasonForm.controls["main_reason_id"].setValue(res["main_reason_id"]);
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
        this.subReasonService.getAll(pageNumber).subscribe(res => {
            this.subReasonObj = res;
            this.spinnerLoaded = false;
        })
      }

      delete(id){
          this.subReasonService.delete(id).subscribe(res => {
            this.getAll(1);
          });
      }
      getMainStatuses(){
          this.mainReasonService.getAll(1).subscribe(res => {
            this.mainReasonList = res['data'];
          })
      }
}