import { Component } from '@angular/core';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionCategoryService } from 'src/app/shared/services/question-category/question-category.service';
import { QuestionService } from 'src/app/shared/services/questionnaire/questionnaire.service';
import { TranslateService } from '@ngx-translate/core';



@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html'
  })

export class QuestionComponent extends AppBaseComponent {
    spinnerLoaded = false;
    questionnaireObj = null;
    pageSize = 10;
    paginationMaxSize = 10;
    submitted = false;
    displayTitleArErrorDuplication = false;
    displayTitleEnErrorDuplication = false;
    questionId = 0;
    questionCategoriesList = [];
    questionTypeList = [];
    questionOptionsList = [];
    options = [];
    displayOptionErrorMessage = false;

    addQuestionForm = new FormGroup({
        title_ar : new FormControl('', [Validators.required, Validators.minLength(3)]),
        title_en : new FormControl('', [Validators.required, Validators.minLength(3)]),
        question_category_id : new FormControl('', [Validators.required, Validators.pattern('^[1-9]\d*$')]),
        type : new FormControl('',[Validators.required]),
        active : new FormControl(false),
        details_required : new FormControl(false)
      });

    constructor(private questionService: QuestionService,
                private modalService: NgbModal,
                private questionCategoryService: QuestionCategoryService,
                private translate: TranslateService) {
        super(translate);
        
    }
    ngOnInit(){
        this.getAll(1);
        this.fillQuestionTypeList();
    }

    fillQuestionTypeList(){
      this.questionTypeList.push({id: 'mcq', title_ar: 'اختيار من متعدد'});
      this.questionTypeList.push({id: 'dichotomous', title_ar: 'اختيار متعدد'});
      //this.questionTypeList.push({id: 'likert_scale', title_ar: 'مقياس الإعجاب'});
      this.questionTypeList.push({id: 'rate', title_ar: 'معدل'});
      this.questionTypeList.push({id: 'open_ended', title_ar: 'كلامى'});
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

    onQuestionCategoryChange(id){

    }
    onQuestionTypeChange(val){
      if(this.addQuestionForm.controls['type'].value == 'open_ended'){
        this.questionOptionsList = [];
        this.options = [];
      }else{
        if(this.questionOptionsList.length == 0){
          this.questionOptionsList.push({val: ''});
        }
      }
    }

    addQuestion(){
      this.submitted = true;
      this.spinnerLoaded = true;
      if(this.addQuestionForm.controls['active'].value == null){
        this.addQuestionForm.controls['active'].setValue(false);
      }
      if(this.addQuestionForm.controls['details_required'].value == null){
        this.addQuestionForm.controls['details_required'].setValue(false);
      }
      if(this.addQuestionForm.status != "VALID"){
        this.spinnerLoaded = false;
        return;
      }
      let model = this.addQuestionForm.value;
      if(this.addQuestionForm.controls['type'].value != 'open_ended'){
        if(this.options.find(f => f == '') != null || this.options.length == 0){
          this.spinnerLoaded = false;
          this.displayOptionErrorMessage = true;
          return;
        }else {
          let listToSave = [];
          for (let index = 0; index < this.options.length; index++) {
            const element = this.options[index];
            listToSave.push({'option': element});
          }
          model['closed_endeds'] = listToSave;
        }
      }else {
        model['closed_endeds'] = [];
      }
        if(this.questionId == 0){
              this.questionService.save(model).subscribe(res => {
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
          this.questionService.update(this.questionId, model).subscribe(res => {
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

    optionsTextChange(){
      this.displayOptionErrorMessage = false;
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
      this.questionId = 0;
      this.spinnerLoaded = false;
      this.questionOptionsList = [];
      this.options = [];
      this.addQuestionForm.reset();
    }

    addChoice(){
      this.questionOptionsList.push({val: ''});
    }

    getbyId(id, content){
      this.spinnerLoaded = false;
      this.questionOptionsList = [];
      this.options = [];
      this.questionService.getbyId(id).subscribe(res => {
         this.addQuestionForm.controls["title_ar"].setValue(res["title_ar"]);
         this.addQuestionForm.controls["title_en"].setValue(res["title_en"]);
         this.addQuestionForm.controls["question_category_id"].setValue(res["question_category_id"]);
         this.addQuestionForm.controls["type"].setValue(res["type"]);
         this.addQuestionForm.controls["active"].setValue(res["active"]);
         this.addQuestionForm.controls["details_required"].setValue(res["details_required"]);
         if(res['closed_endeds'].length > 0){
           for (let index = 0; index < res['closed_endeds'].length; index++) {
             const element = res['closed_endeds'][index];
             this.questionOptionsList.push({val: ''});
             this.options.push(element.option);
           }
            
         }
         this.questionId = id;
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          }, (reason) => {
          });
      });
    }

    close(){
      this.questionId = 0;
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
      this.addChoice();
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        }, (reason) => {
        });
      }

    getAll(pageNumber){
        this.questionCategoryService.getAll(pageNumber).subscribe(res => {
            this.questionnaireObj = res;
            for (let index = 0; index < this.questionnaireObj.data.length; index++) {
              const element = this.questionnaireObj.data[index];
              element.displayData = false;
            }
            this.questionCategoriesList = res['data'];
        })
      }

      delete(id){
          this.questionService.delete(id).subscribe(res => {
            this.getAll(1);
          });
      }

      displayDataFun( id){
        let item = this.questionnaireObj.data.find(f => f.id == id);
        if(item != null){
          item.displayData = !item.displayData;
        }
      }
}