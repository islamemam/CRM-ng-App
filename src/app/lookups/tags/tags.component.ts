import { Component } from '@angular/core';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TagService } from 'src/app/shared/services/tag/tag.service';
import { TranslateService } from '@ngx-translate/core';



@Component({
    selector: 'app-tags',
    templateUrl: './tags.component.html'
  })

export class TagComponent extends AppBaseComponent {
    tagObj = null;
    pageSize = 10;
    paginationMaxSize = 10;
    addHospitalSpinner = false;
    submitted = false;
    displayTitleArErrorDuplication = false;
    tagId = 0;
    spinnerLoaded = false;

    addTagForm = new FormGroup({
        title : new FormControl('', [Validators.required, Validators.minLength(3)])
      });

    constructor(private tagService: TagService,
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

    arabicTitleChange(){
      this.displayTitleArErrorDuplication = false;
    }

    addTag(){
      this.submitted = true;
      this.spinnerLoaded = true;
      if(this.addTagForm.status != "VALID"){
        this.spinnerLoaded = false;
        return;
      }
        let model = this.addTagForm.value;
        if(this.tagId == 0){
              this.tagService.save(model).subscribe(res => {
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
          this.tagService.update(this.tagId, model).subscribe(res => {
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
        if(errordexcripteveList.find(f => f == 'title') != null){
        this.displayTitleArErrorDuplication = true;
      }else{
        this.displayTitleArErrorDuplication = false;
      }
    }

    clearData(){
      this.tagId = 0;
      this.spinnerLoaded = false;
      this.addTagForm.reset();
    }

    getbyId(id, content){
        this.spinnerLoaded = false;
      this.tagService.getbyId(id).subscribe(res => {
        this.addTagForm.controls["title"].setValue(res["title"]);
        this.tagId = id;
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          }, (reason) => {
          });
      });
    }

    close(){
      this.tagId = 0;
      this.displayTitleArErrorDuplication = false;
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
        this.tagService.getAll(pageNumber).subscribe(res => {
            this.tagObj = res;
        })
      }

      delete(id){
          this.tagService.delete(id).subscribe(res => {
            this.getAll(1);
          });
      }
}