import { Component } from '@angular/core';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MainStatusService } from 'src/app/shared/services/main-status/main-status.service';
import { TranslateService } from '@ngx-translate/core';



@Component({
    selector: 'app-main-statuses',
    templateUrl: './main-statuses.component.html'
  })

export class MainStatusComponent extends AppBaseComponent {
    nationalities = [];
    dataLoded = true;
    mainStatusObj = null;
    pageSize = 10;
    paginationMaxSize = 10;
    addHospitalSpinner = false;
    haserror:boolean=false;
    submitted = false;
    addclienterrormsg:any;
    alreadytaken = false;
    errorarrays:any;
    displayTitleArErrorDuplication = false;
    displayTitleEnErrorDuplication = false;
    nationalityId = 0;

    addStatusForm = new FormGroup({
        title_ar : new FormControl('', [Validators.required, Validators.minLength(3)]),
        title_en : new FormControl('', [Validators.required, Validators.minLength(3)]),
      });

    constructor(private mainStatusService: MainStatusService,
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
      if(this.addStatusForm.status != "VALID"){
        return;
      }
        let model = this.addStatusForm.value;
        if(this.nationalityId == 0){
              this.mainStatusService.save(model).subscribe(res => {
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
          this.mainStatusService.update(this.nationalityId, model).subscribe(res => {
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
      this.nationalityId = 0;
      this.addStatusForm.reset();
    }

    getbyId(id, content){
      this.mainStatusService.getbyId(id).subscribe(res => {
        this.addStatusForm.controls["title_ar"].setValue(res["title_ar"]);
        this.addStatusForm.controls["title_en"].setValue(res["title_en"]);
        this.nationalityId = id;
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          }, (reason) => {
          });
      });
    }

    close(){
      this.nationalityId = 0;
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
        this.mainStatusService.getAll(pageNumber).subscribe(res => {
            this.mainStatusObj = res;
        })
      }

      delete(id){
          this.mainStatusService.delete(id).subscribe(res => {
            this.getAll(1);
          });
      }
}