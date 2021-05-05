import { GetRolesService } from 'src/app/shared/services/api/get-roles.service';
import { Component, OnInit  } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppBaseComponent } from '../../base-omponent/app-base-component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetUsersService } from 'src/app/shared/services/api/ticketinfo/get-users.service';
import { AutoReplyService } from 'src/app/shared/services/api/ticket-replies/auto-reply.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KeywordsService } from 'src/app/shared/services/api/ticket-replies/keywords.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-auto-response',
  templateUrl: './auto-response.component.html',
  styleUrls: ['./auto-response.component.scss']
})
export class AutoResponseComponent  extends AppBaseComponent{
  autoreplys:any;
  pageSize = 10;
  paginationMaxSize = 1000000;
  replytoedit:any;
  keywords:any=[];
  editDone:boolean = false;
  adddone:boolean = false;

  keywordsforkjoinarray=[];
  constructor(private translate: TranslateService,
              private keywordsService:KeywordsService,
              private modalService: NgbModal,
              private AutoReplyService:AutoReplyService,
              private GetRolesService:GetRolesService
              ) {
    super(translate);
   }

  ngOnInit() {
    //get auto response from DB page 1
    this.getAutoReply(1);
    this.getKeyWords();
    this.getRoles();
  }
  openModal(content) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
    }, (reason) => {
    });
  }
  openDeleteConfirmation(content,id,$event) {
    $event.preventDefault();
    this.modalService.open(content, {centered: true}).result.then((result) => {
            if(result == 'Save'){
              this.delete(id);
            }
          }, (reason) => {
        });
  }

  // declear edit reply form
  editReplyForm = new FormGroup({
    id : new FormControl('',),
    title_ar : new FormControl('',),
    details_ar : new FormControl('',),
    title_en : new FormControl('',),
    details_en : new FormControl('',),
    role_id : new FormControl('1',)

  });
  addReplyForm = new FormGroup({
    title_ar : new FormControl('',[Validators.required]),
    details_ar : new FormControl('',[Validators.required]),
    title_en : new FormControl('',[Validators.required]),
    details_en : new FormControl('',[Validators.required]),
    role_id : new FormControl('1',[Validators.required])

  });
  addReply(addreply){
    console.log(addreply);
    this.AutoReplyService.add(addreply).subscribe(data=>{
      console.log(data);
      this.adddone = true;
    })
  }
  editReply(reply){
    let id = this.editReplyForm.get("id").value
    console.log(reply);
    this.AutoReplyService.edit(id,reply).subscribe(data=>{
      console.log(data);
      this.editDone = true;
    })
  }
  addArkey(key){
    console.log(key.value);
    this.editReplyForm.controls.details_ar.setValue(this.editReplyForm.get("details_ar").value + " {"+key.value+"} ");
  }
  addArkeyinadd(key){
    this.addReplyForm.controls.details_ar.setValue(this.addReplyForm.get("details_ar").value + " {"+key.value+"} ");
  }
  addEnkey(key){
    this.editReplyForm.controls.details_en.setValue(this.editReplyForm.get("details_en").value + " {"+key.value+"} ");
  }
  addEnkeyinadd(key){
    this.addReplyForm.controls.details_en.setValue(this.addReplyForm.get("details_en").value + " {"+key.value+"} ");
  }
  openEditConfirmation(content,id) {
    // set form value to current reply
    this.AutoReplyService.get(id).subscribe(data=>{
      this.replytoedit = data;
      this.editReplyForm.controls.title_ar.setValue(data["title_ar"]);
      this.editReplyForm.controls.details_ar.setValue(data["details_ar"]);
      this.editReplyForm.controls.title_en.setValue(data["title_en"]);
      this.editReplyForm.controls.details_en.setValue(data["details_en"]);
      this.editReplyForm.controls.id.setValue(id);

    })
    //open modal
    this.modalService.open(content, {centered: true}).result.then((result) => {
      this.editDone = false;
      this.adddone = false;
      this.addReplyForm.reset();
      this.addReplyForm.controls.role_id.setValue("1");
      location.reload();
          }, (reason) => {
      this.editDone = false;
      this.adddone = false;
      this.addReplyForm.reset();
      this.addReplyForm.controls.role_id.setValue("1");
      location.reload();

    });
  }
  getAutoReply(page){
    this.AutoReplyService.getReply(page).subscribe(data=>{3
      this.autoreplys = data;
    })
  }
  delete(id){
    this.AutoReplyService.delete(id).subscribe(res => {
      this.getAutoReply(1);
    });
  }
  onpageChange(pageNumber){
    this.getAutoReply(pageNumber);
  }
  getKeyWords(){
    let pages:number
    this.keywordsService.getpages().subscribe(data=>{
      pages = data["meta"]["last_page"];
      console.log("keywords pages = " + pages);
      for(var reqpage = 0 ; reqpage < pages ; reqpage++){
        this.keywordsforkjoinarray[reqpage] = this.keywordsService.getKeyword(reqpage+1);
      }
      this.getAllKeywordsWithFork();
    })
    
  }
  getAllKeywordsWithFork(){
    forkJoin(this.keywordsforkjoinarray).subscribe(results => {
      for(var responseindex = 0 ; responseindex < results.length ; responseindex++){
        this.keywords.push(results[responseindex]["data"])
      }
      this.keywords = [].concat.apply([],this.keywords)
      console.log(this.keywords);
    }); 
  }
 roles:any=[];
 rolesforkjoinarray =[]
  getRoles(){
    let pages:number
    this.GetRolesService.getAll().subscribe(data=>{
      pages = data["meta"]["last_page"];
      console.log("roles pages = " + pages);
      for(var reqpage = 0 ; reqpage < pages ; reqpage++){
        this.rolesforkjoinarray[reqpage] = this.GetRolesService.getByPage(reqpage+1);
      }
      this.getAllRolesWithFork();
    })
  }
  getAllRolesWithFork(){
    forkJoin(this.rolesforkjoinarray).subscribe(results => {
      for(var responseindex = 0 ; responseindex < results.length ; responseindex++){
        this.roles.push(results[responseindex]["data"])
      }
      this.roles = [].concat.apply([],this.roles)
      console.log(this.roles);
    }); 
  }
  

}
