import { Component } from '@angular/core';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionCategoryService } from 'src/app/shared/services/question-category/question-category.service';
import { TranslateService } from '@ngx-translate/core';



@Component({
    selector: 'app-question-category',
    templateUrl: './question-category.component.html'
  })

export class QuestoinCategoryComponent extends AppBaseComponent {
    spinnerLoaded = false;
    questionCategory = null;
    pageSize = 10;
    paginationMaxSize = 10;
    submitted = false;
    displayTitleArErrorDuplication = false;
    displayTitleEnErrorDuplication = false;
    nationalityId = 0;

    addNationalityForm = new FormGroup({
        title_ar : new FormControl('', [Validators.required, Validators.minLength(3)]),
        title_en : new FormControl('', [Validators.required, Validators.minLength(3)]),
      });

    constructor(private questionCategoryService: QuestionCategoryService,
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

    addNationality(){
      this.submitted = true;
      this.spinnerLoaded = true;
      if(this.addNationalityForm.status != "VALID"){
        this.spinnerLoaded = false;
        return;
      }
        let model = this.addNationalityForm.value;
        if(this.nationalityId == 0){
              this.questionCategoryService.save(model).subscribe(res => {
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
          this.questionCategoryService.update(this.nationalityId, model).subscribe(res => {
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
      this.nationalityId = 0;
      this.spinnerLoaded = false;
      this.addNationalityForm.reset();
    }

    getbyId(id, content){
      this.spinnerLoaded = false;
      this.questionCategoryService.getbyId(id).subscribe(res => {
        this.addNationalityForm.controls["title_ar"].setValue(res["title_ar"]);
        this.addNationalityForm.controls["title_en"].setValue(res["title_en"]);
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
        this.questionCategoryService.getAll(pageNumber).subscribe(res => {
            this.questionCategory = res;
        })
      }

      delete(id){
          this.questionCategoryService.delete(id).subscribe(res => {
            this.getAll(1);
          });
      }
}