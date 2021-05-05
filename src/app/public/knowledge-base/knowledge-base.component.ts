import { Component, OnInit } from '@angular/core';
import { KnowledgeBaseService } from 'src/app/shared/services/knowledge-base.service';
import {NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-knowledge-base',
  templateUrl: './knowledge-base.component.html',
  styleUrls: ['./knowledge-base.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})

export class KnowledgeBaseComponent extends AppBaseComponent implements OnInit {
  isCollapsed: boolean = false; //for Accordion
  categoriesData: any = {meta:{total:0}}
  page = 1;
  keyWord = '';
  roleIdData:any;
  categoryModel ={
  id :0,
  title_en:'',
  title_ar:''
  }
  subjectModel = {
    id:0,
    title_en: '',
    title_ar: '',
    details_en: '',
    details_ar: '',
    category_id: 0,
    role_id:0
  };
  alerts =[];
  constructor(private translate: TranslateService, private _KnowledgeBaseService: KnowledgeBaseService, config: NgbModalConfig, private modalService: NgbModal) {
    super(translate);
        // customize default values of modals used by this component tree
        config.backdrop = 'static';
        config.keyboard = false;    
  }
  ngOnInit() {
    this.load(this.page, this.keyWord);
    this.roleId()
  }
  load(page, keyWord) {
    this._KnowledgeBaseService.getCategories(page, keyWord)
      .subscribe(
        data => {
          let lang = localStorage.getItem('lang');
          this.categoriesData = data;
          this.categoriesData.data=this.categoriesData.data.map(cat=>{
            cat.title= lang=='ar'?cat.title_ar:cat.title_en;
            cat.details= lang=='ar'?cat.details_ar:cat.details_en;
            return cat;
          })
        },
        erro => console.error(erro)
      );
  }
  search() {
    this.page = 1;
    this.load(this.page, this.keyWord);
  }
  open(addNewSubject) {
    this.modalService.open(addNewSubject, { ariaLabelledBy: 'modal-basic-title'})
  }
openNewCategory(addNewCategory) {
    this.modalService.open(addNewCategory, { ariaLabelledBy: 'modal-basic-title'})
  }
saveSubject(){
    this._KnowledgeBaseService.addSubject(this.subjectModel)
    .subscribe(
      data => {
        this.alerts.push({
          type:"success",
          message:"تم الحفظ بنجاح"
        })
      this.load(1,"");
    },
      erro => console.error(erro)
    );
  }
  saveCategory(){
    this._KnowledgeBaseService.addCategory(this.categoryModel)
    .subscribe(
      data => {
        this.alerts.push({
          type:"success",
          message: "تم الحفظ بنجاح"
        })        
        this.load(1,"");
      },
      erro => console.error(erro)
    );
  }
    close(alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
editSubject(kb,addNewSubject){
this.subjectModel = kb;
this.open(addNewSubject);
}
updateSubject(){
  this._KnowledgeBaseService.updateSubject(this.subjectModel)
  .subscribe(
    data => this.load(1,""),
    erro => console.error(erro)
  );
}
confirmDelete(kb) {
  this.subjectModel = kb;
  var yes = confirm("are you sure?");
  if (yes) {
    this.deleteSubject()
  }
}
deleteSubject() {
  this._KnowledgeBaseService.destroySubject(this.subjectModel)
    .subscribe(
      () => {
        this.load(1, "");
      },
      err => console.log(err)
    )
}
save(){
if(this.subjectModel.id<=0){
  this.saveSubject()
}else{
  this.updateSubject();
}
}
roleId(){
  this._KnowledgeBaseService.getRoleId()
  .subscribe(
    data=>{
      this.roleIdData = data;
    },
    erro=> console.log(erro)
  )
}
changePage(e){
this.page = parseInt(e.target.text);
  this.load(this.page,this.keyWord);
}

closeClearcat(modal){
  modal.dismiss('Cross click');
  this.categoryModel = {
    id :0,
    title_en:'',
    title_ar:''
    };
}
closeClearsub(modalSubject){
  modalSubject.dismiss('Cross click');
  this.subjectModel = {
    id:0,
    title_en: '',
    title_ar: '',
    details_en: '',
    details_ar: '',
    category_id: 0,
    role_id:0
    };
}
}