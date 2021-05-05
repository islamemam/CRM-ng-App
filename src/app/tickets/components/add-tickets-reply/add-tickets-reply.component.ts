import { client } from './../../../client/clients/client';
import { Component, OnInit, Input } from '@angular/core';
 
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Reply, IReply } from 'src/app/shared/models/reply.model';
import { GenericCrudService } from 'src/app/shared/services/api/generic-crud.service';
import { IActor } from 'src/app/shared/models/actor.model';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { ExternalUnit, IExternalUnit } from 'src/app/shared/models/external-unit.model';
import { IDepartment, Department } from 'src/app/shared/models/department.model';
import { IUser, User } from 'src/app/shared/models/user.model';
import { IClientG, ClientG } from 'src/app/shared/models/clientg.model';
import { GetExternalUnitsService } from '../../../shared/services/api/ticketinfo/get-external-units.service';
import { ActivatedRoute } from '@angular/router';
import { StoreRepliesService } from '../../../shared/services/api/ticketinfo/store-replies.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetDepartmentsService } from '../../../shared/services/api/ticketinfo/get-departments.service';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { TranslateService } from '@ngx-translate/core';
import { SendSmsService } from '../../../shared/services/api/ticket-replies/send-sms.service';
import { AutoReplyService } from 'src/app/shared/services/api/ticket-replies/auto-reply.service';
 
@Component({
  selector: 'app-add-tickets-reply',
  templateUrl: './add-tickets-reply.component.html',
  styleUrls: ['./add-tickets-reply.component.scss']
})
export class AddTicketsReplyComponent extends AppBaseComponent implements OnInit {
    submitted = false;
    reply:IReply;
    isLoading = false;
    filteredActors: IActor[] = [];
    @Input() ticketObject;
    userId:any;
    userName:any;
    clientID:any;
    ticketId:any;
    clientName:any;
  constructor(private getExternalUnitsService:GetExternalUnitsService,
              private route:ActivatedRoute,
              private storeRepliesService:StoreRepliesService,
              private modalService: NgbModal,
              private getDepartmentsService:GetDepartmentsService,
              private translate: TranslateService,
              private sendSmsService:SendSmsService,
              private AutoReplyService:AutoReplyService
              )
              {
    super(translate);
  }
  
  ticketReplyForm = new FormGroup({
    from : new FormControl(null,Validators.required),
    to : new FormControl(null,Validators.required),
    subject : new FormControl('',Validators.required),
    details : new FormControl('',Validators.required),
  });

  externalUnitForm = new FormGroup({
    to : new FormControl(null,Validators.required),
    subject : new FormControl('',Validators.required),
    details : new FormControl('',Validators.required),
  });
  externalUnits:any;
  loadingExternalSpinner:boolean=true;
  loadExternalUnits(){
    this.getExternalUnitsService.getExternalUnits(localStorage.getItem("token")).subscribe(data=>{
      this.externalUnits = data["data"];
      this.loadingExternalSpinner = false;
    });
  }
  departments:any;
 loadDepartments(){
  this.getDepartmentsService.getDepartments(localStorage.getItem("token")).subscribe(data=>{
    this.departments = data["data"];
  
  });
 }
  ngOnInit() {
    this.clientID = this.ticketObject["data"][0]["client_id"];
    this.userId = this.ticketObject["data"][0]["user_id"];
    this.ticketId = this.ticketObject["data"][0]["id"];
    this.clientName = this.ticketObject["data"][0]["client"]["name"];
    this.userName = this.ticketObject["data"][0]["user"]["name"];
    this.loadExternalUnits();
    this.loadDepartments();
    this.getrepliestemplates();
  }

  action:any = "";
  sms:any={};
  onSubmit(data,buttonType,modal) {  
    this.addReplySpinner = true;

    this.repliesFilterdObject["ticket_id"] = this.ticketId;
    this.repliesFilterdObject["subject"] = data.subject;
    this.repliesFilterdObject["details"] = data.details;
    console.log(buttonType);
    console.log(this.repliesFilterdObject);
    this.open(modal);
    if(buttonType == 'save'){
      this.action = "حفظ"
      this.storeRepliesService.storeReply(localStorage.getItem("token"),this.repliesFilterdObject).subscribe(data=>{
       
        this.addReplySpinner = false;
      })
    }else if (buttonType == 'send'){
      this.action = "إرسال"
      this.storeRepliesService.storeReply(localStorage.getItem("token"),this.repliesFilterdObject).subscribe(data=>{
      
        // this.addReplySpinner = false;
      })
      this.sms["client_id"]=this.clientID;
      this.sms["msg"]=data.details;

      this.sendSmsService.sendSmsm(this.sms).subscribe(data=>{
        this.addReplySpinner = false;
      })
    }
}

toActor:any;
userTypes = [
  {value: '1', type: 'App\\Models\\User',title:'مستخدم'},
  {value: '2', type: 'App\\Models\\Client',title:'مستفيد'},
  {value: '3', type: 'App\\Models\\Department',title:'قسم'},
  
];
repliesFilterdObject:{} = {
  ticket_id :"",
  subject:"",
  details:"",
  to:"",
  from:"",
  to_type:"",
  from_type:""
}
filterdToActor:any;
filterdToActorSpinner:boolean=false

innerDepartment:boolean = false;
externalDepartment:boolean = false;

selectDepartment(department){
  if(department == "inner"){
    this.innerDepartment = true;
    this.externalDepartment = false;

  }else if(department == "external"){
    this.externalDepartment = true
    this.innerDepartment = false;

  }
}

externalFilterdObject:{} = {
  ticket_id :this.route.snapshot.paramMap.get('id'),
  subject:"",
  details:"",
  to:"",
  to_type:"App\\Models\\ExternalUnit",
}
addReplySpinner:boolean=true;
externalSubmit(data){
  this.externalFilterdObject["subject"] = data.subject;
  this.externalFilterdObject["details"] = data.details;
  this.externalFilterdObject["to"] = data.to;
  console.log(this.externalFilterdObject);
  this.storeRepliesService.storeReply(localStorage.getItem("token"),this.externalFilterdObject).subscribe(data=>{
    console.log(data)
    this.addReplySpinner = false;
  },error=>{
    console.log(error)
  })

}
closeResult: string;
open(content) {
  this.modalService.open(content, { size: 'sm',centered: true, backdrop:'static'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
    this.addReplySpinner = true;
    location.reload();
  }, (reason) => {
    this.closeResult = `Dismissed `;
    this.addReplySpinner = true;
    location.reload();
  });
}
fromchangeUserType($event){
    
  const fromType = $event.target.value ;
  if(fromType == "user"){
    this.repliesFilterdObject['from_type'] = 'App\\Models\\User';
    this.repliesFilterdObject["from"] = (this.userId);
  }else if(fromType == "client"){
    this.repliesFilterdObject['from_type'] = 'App\\Models\\Client';
    this.repliesFilterdObject["from"] = (this.clientID);
  }else{
    this.repliesFilterdObject['from_type'] = 'App\\Models\\Department'; 
    this.repliesFilterdObject["from"] = $event.target.value;
  }
  console.log("from type"+fromType+typeof(fromType));
  console.log(this.repliesFilterdObject);
//   switch(fromType) { 
//     case ("user"): { 
//       this.repliesFilterdObject['from_type'] = 'App\\Models\\User';
//       this.repliesFilterdObject["from"] = (this.userId);
//       console.log(this.repliesFilterdObject);
//        break; 
//     } 
//     case ("client"): { 
//       this.repliesFilterdObject['from_type'] = 'App\\Models\\Client';
//       this.repliesFilterdObject["from"] = (this.clientID);
//       console.log(this.repliesFilterdObject);
//        break; 
//     } 
//     case (Number(fromType) != NaN): { 
//       this.repliesFilterdObject['from_type'] = 'App\\Models\\Departments'; 
//       this.repliesFilterdObject["from"] = null;
//        break; 
//     } 
//  } 


}
externalUnit:boolean=false;
department:boolean=false;
showSendBtn:boolean=false;
tochangeUserType($event){
    
  const fromType = $event.target.value ;
  if(fromType == "user"){
    this.repliesFilterdObject['to_type'] = 'App\\Models\\User';
    this.repliesFilterdObject["to"] = (this.userId);
    this.showSendBtn = false;

  }else if(fromType == "client"){
    this.repliesFilterdObject['to_type'] = 'App\\Models\\Client';
    this.repliesFilterdObject["to"] = (this.clientID);
    this.showSendBtn = true;
  }else{
    this.repliesFilterdObject['to_type'] = 'App\\Models\\Department'; 
    this.repliesFilterdObject["to"] = $event.target.value;
    this.showSendBtn = false;

  }
  console.log(this.repliesFilterdObject);

}
onReset() {
    this.submitted = false;
    this.ticketReplyForm.reset();
}
displayFn(actor: IActor) {
  if (actor) { return actor.title; }
}
repliestemplates:any=[];
replysforkjoinarray =[]
 getrepliestemplates(){
   let pages:number
   this.AutoReplyService.getReply(1).subscribe(data=>{
     pages = data["meta"]["last_page"];
     for(var reqpage = 0 ; reqpage < pages ; reqpage++){
       this.replysforkjoinarray[reqpage] = this.AutoReplyService.getReply(reqpage+1);
     }
     this.getAllrepliestemplatessWithFork();
   })
 }
 getAllrepliestemplatessWithFork(){
   forkJoin(this.replysforkjoinarray).subscribe(results => {
     for(var responseindex = 0 ; responseindex < results.length ; responseindex++){
       this.repliestemplates.push(results[responseindex]["data"])
     }
     this.repliestemplates = [].concat.apply([],this.repliestemplates)
   }); 
 }
 //ticketId
 getReplyTemplate(value){
  this.AutoReplyService.getWithValue(this.ticketId,value).subscribe(data=>{
    this.ticketReplyForm.controls.details.setValue(data["ar"]);
  })
 }
 getReplyTemplateExternal(value){
  this.AutoReplyService.getWithValue(this.ticketId,value).subscribe(data=>{
    this.externalUnitForm.controls.details.setValue(data["ar"]);
  })
 }

}

