import { IDepartment } from 'src/app/shared/models/department.model';
import { Status } from './../../../shared/models/status.model';
import { GetPrioritiesService } from './../../../shared/services/api/ticketinfo/get-priorities.service';
import { GetClientService } from './../../../shared/services/api/get-client.service';
import { Component, OnInit, ViewChild, ElementRef,Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {GetServiceService} from './../../../shared/services/api/ticketinfo/get-service.service'
import { GetTicketTypesService } from '../../../shared/services/api/ticketinfo/get-ticket-types.service';
import { GetMainReasonsService } from '../../../shared/services/api/ticketinfo/get-main-reasons.service';
import { GetSubReasonsService } from '../../../shared/services/api/ticketinfo/get-sub-reasons.service';
import { GetHospitalsService } from '../../../shared/services/api/ticketinfo/get-hospitals.service';
import { GetStatuesService } from '../../../shared/services/api/ticketinfo/get-statues.service';
import { StoreService} from '../../../shared/services/api/add-ticket/store.service'
import { TranslateService } from '@ngx-translate/core';
import { TicketsService } from 'src/app/shared/services/api/tickets.service';
import { GenericCrudService } from 'src/app/shared/services/api/generic-crud.service';
import { Reply, IReply } from 'src/app/shared/models/reply.model';
import { ClientType } from 'src/app/shared/models/client-type.model';
import { Note } from 'src/app/shared/models/note.model';
import {GetSubClientService } from'../../../shared/services/api/ticketinfo/get-sub-client.service' 
import {GetTagsService } from'../../../shared/services/api/ticketinfo/get-tags.service' 
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material'; 
import { FormControl, FormArray } from '@angular/forms'; 
import {Observable, forkJoin} from 'rxjs'; 
import {map, startWith} from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GetTicketService } from '../../../shared/services/api/ticketinfo/get-ticket.service';
import {NgbModal, ModalDismissReasons, NgbDateStruct, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { SetClientIdService } from '../../../shared/services/clients/set-client-id.service';
import { UpdateTicketService } from '../../../shared/services/api/update-ticket/update-ticket.service';
import { MergeTicketsComponent } from '../tickets-component/merge-tickets/merge-ticket.component';
import { GetQuestionsService } from 'src/app/shared/services/api/ticketinfo/get-questions.service';
import { GetStatusesService } from 'src/app/shared/services/api/ticketinfo/get-statuses.service';
import { GetEvauluationQesService } from '../../../shared/services/api/ticketinfo/get-evauluation-qes.service';
import { ShowClientService } from '../../../shared/services/api/clients/show-client.service';
import { GetNationalIdTypesService } from '../../../shared/services/api/clients/get-national-id-types.service';
import { GetNationalitiesService } from '../../../shared/services/api/clients/get-nationalities.service';
import { GetClientTypesService } from '../../../shared/services/api/clients/get-client-types.service';
import { EditClientService } from '../../../shared/services/api/clients/edit-client.service';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { CopyTicketService } from '../../../shared/services/api/copy-ticket/copy-ticket.service';
import { StoreAnswerService } from '../../../shared/services/api/ticketinfo/store-answer.service';
import { ClientsSearchService } from '../../../shared/services/api/clients/clients-search.service';


@Component({
  selector: 'app-tickets-component',
  templateUrl: './tickets-component.component.html',
  styleUrls: ['./tickets-component.component.scss'],
  providers: []
})
export class addTicketsMainComponent extends AppBaseComponent implements OnInit {
  clientSearchLoading:boolean = false;
  nationalIdInputError:boolean = false;
  clientSearchDone:boolean = false;
  clientObject;
  falseNationalId:boolean = false;
  selectClient:boolean = false;
  displayEditButton = false;
 
  public replies: Reply[] = [];

  public notes: Note[] = [];
  
  //get ticket info vars
  
  requesterId :number;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagsCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  clientIdToEdit:any=null;
  currentClientToEdit;
  editClientDone:boolean = false;
  editClientLoading:boolean = false;
  @ViewChild('fruitInput', {static: false}) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  @ViewChild('mergeTickets', {static:false}) mergeTickets: MergeTicketsComponent;
  displayEvaluationButton = false;

  constructor(private getClientService :GetClientService,
    private router:Router,
    private getInfo:GetServiceService,
    private getTypes:GetTicketTypesService,
    private getMainReasonService:GetMainReasonsService,
    private getSubReasonService:GetSubReasonsService,
    private getPrioritiesSetvice:GetPrioritiesService,
    private getHospitalsService:GetHospitalsService,
    private getStatuesService:GetStatuesService,
    private getSubClientService:GetSubClientService,
    private getTagsService:GetTagsService,
    private http:HttpClient,
    private translate: TranslateService,
    private  genericCrudService: GenericCrudService,
    private storeService:StoreService,
    private setClientIdService: SetClientIdService ,
    private route:ActivatedRoute,
    private getTicketService:GetTicketService,
    private updateTicketService:UpdateTicketService,
    private modalService: NgbModal,
    private questionsService: GetQuestionsService,
    private getStatusesService: GetStatusesService,
    private getEvauluationQesService:GetEvauluationQesService,
    private formBuilder: FormBuilder,
    private showClientService:ShowClientService,
    private getNationalIdTypesService:GetNationalIdTypesService,
    private getNationalitiesService:GetNationalitiesService,
    private getClientTypesService:GetClientTypesService,
    private editClientService:EditClientService,
    private copyTicketService:CopyTicketService,
    private storeAnswerService:StoreAnswerService,
    private clientsSearchService:ClientsSearchService,
    private sourcesService:GetServiceService
   ) {
    super(translate);
    this.filteredTags = this.tagsCtrl.valueChanges.pipe(startWith(null), map((fruit: string | null) => fruit ? this._filter(fruit) : this.allTags.slice()));
    
  }
  copiedTicketNumber;
  currentRate = 3.14;
  copyTicketspinner:boolean=false;
  copyTicket(content){
    this.copyTicketspinner = true
    let ticketId = this.route.snapshot.paramMap.get('id');
    console.log(this.isGranted('Copy Ticket'))
    this.copyTicketService.copyTicket(ticketId).subscribe(data=>{
      console.log(data)
      this.copiedTicketNumber = data["id"];
      this.copyTicketspinner = false
    });
    this.modalService.open(content, { centered: true });
  }
  goToCopiedTicket(){
    console.log(this.copiedTicketNumber)
      this.router.navigate(['/tickets/add-ticket', this.copiedTicketNumber]);
      location.reload();
  }
  openCopyTicketModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.editClientDone = false;
      this.editClientLoading = false;
      
    }, (reason) => {
      this.editClientDone = false;
      this.editClientLoading = false;
  
      
    });
  }
 showFrutis(){
  //  console.log(this.tags);
 }
 closeSelectClientModal(){
  this.ShowSelectClientModal = false;
 }
 
 add(event: MatChipInputEvent): void {
  // Add fruit only when MatAutocomplete is not open
  // To make sure this does not conflict with OptionSelected Event
  if (!this.matAutocomplete.isOpen) {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagsCtrl.setValue(null);
  }
}

remove(fruit: string): void {
  const index = this.tags.indexOf(fruit);

  if (index >= 0) {
    this.tags.splice(index, 1);
  }
}

selected(event: MatAutocompleteSelectedEvent): void {
  this.tags.push(event.option.viewValue);
  this.fruitInput.nativeElement.value = '';
  this.tagsCtrl.setValue(null);
}

private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.allTags.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
}

disableAC(){
  this.tagsCtrl.disabled ? this.tagsCtrl.enable() : this.tagsCtrl.disable()
  // console.log(this.tagsCtrl.disabled)
}

//get tags
tagsFromBackEnd:any;
getTags(){
this.getTagsService.getTags(localStorage.getItem('token')).subscribe(data=>{
  this.tagsFromBackEnd = data;

  this.allTags = data["data"];
  // console.log(this.tagsFromBackEnd)
//   for(var counter:number = 0;  counter<this.allTags.length; counter++){
//     this.allTags[counter] = this.allTags[counter]["title"]
    
// }
  this.allTags = this.allTags.map(o => o["title"])
  // console.log(this.allTags)
});
}
addhospital(){
  // console.log("add Hopspital");
  (this.editClientForm.get('hospitals') as FormArray).push(this.createItem());
}
addhospitalFromForm(){
  // console.log("add Hopspital");
  (this.editClientForm.get('hospitals') as FormArray).push(this.createItem());
  this.currentClientsHospitalsArrayWithName.push(this.createItem());
  this.currentClientsHospitalsArray.push(this.createItem());
}
removeHospital(i){
  console.log(i);
  this.currentClientsHospitalsArrayWithName.splice(i,1)
  this.currentClientsHospitalsArray.splice(i,1)
}
removeHospitalFromForm(i){
  (this.editClientForm.get('hospitals') as FormArray).removeAt(i)

}
showTags(){
// console.log(this.tags)
}
createItem(): FormGroup {
  return this.formBuilder.group({
    hospital_id: '',
    file_number:''
  });
}
phoneNumberPattern = '[0-9]+';
editClientObject;
editBirthDateModel:NgbDateStruct
editClientForm = new FormGroup({
  name : new FormControl('',),
  mobile : new FormControl('',[Validators.pattern(this.phoneNumberPattern),Validators.minLength(9),Validators.maxLength(9)]),
  national_id_type_id : new FormControl('',),
  national_id : new FormControl('',),
  telephone : new FormControl('',Validators.pattern(this.phoneNumberPattern)),
  nationality_id : new FormControl('',),
  address : new FormControl('',),
  email : new FormControl('',),
  ministry_member : new FormControl('',),
  gender : new FormControl('',),
  client_type_id : new FormControl('',),
  hospitals : this.formBuilder.array([]),
  client_id:new FormControl('',),
  birthdate: new FormControl('',)

});
minDate = {year: 1900, month: 1, day: 1};
maxDate = {year: 2020, month: 12, day: 30};
editClientsSpinner:boolean = false;
// edit client 
editClient(){
  this.editClientsSpinner = true;
  this.editClientObject = this.editClientForm.value ;
  this.editClientObject["hospitals"] = this.currentClientsHospitalsArray.concat(this.editClientForm.get("hospitals").value);
  this.editClientObject["birthdate"] = this.birthdate
  // this.editClientObject["hospitals"] = this.editClientForm.get("hospitals").value + this.currentClientsHospitalsArray ;
  console.log(this.editClientObject);
  this.editClientService.updateClient(localStorage.getItem("token"),this.clientIdToEdit,this.editClientObject).subscribe(data =>{
    console.log(data);
    this.editClientDone = true;
    this.editClientsSpinner = false;

  })
}
selectclient:boolean = false
editClientType(id){
  if(id ==2 || id ==3){
    console.log("should select parent");
    this.selectclient = true;
  }else{
    this.selectclient = false;
    this.editClientForm.patchValue({
      client_id : this.currentClientToEdit["id"]
    },)
  }
}
oldmonth;
oldday;
formatedday;
formatedMonth;
birthdate;
formatDate(date){
  console.log(this.editClientForm.get("birthdate").value)
  this.oldmonth = (this.editClientForm.get("birthdate").value.month).toString();
  this.oldday = (this.editClientForm.get("birthdate").value.day).toString();

  if(this.oldmonth.length == 1){
 
    this.formatedMonth = "0" + this.oldmonth ;
  }else{
    this.formatedMonth = this.oldmonth ;
  }
  if(this.oldday.length == 1){
    
    this.formatedday = "0" + this.oldday ;
  }else{
    this.formatedday = this.oldday ;
  }
 this.birthdate = this.editClientForm.get("birthdate").value.year + "-" + this.formatedMonth + "-" + this.formatedday;

}
mainclientname="";
mainclientid;
mainClientResponse
getMainClientSpinner:boolean=false;
mainClient :any = {} ;
getMainClientId(nationalId:String){

  if(nationalId.length == 10){
    this.getMainClientSpinner = true;
    this.mainClient.national_id = nationalId;
    this.clientsSearchService.search(localStorage.getItem("token"),this.mainClient,1).subscribe(
      users => {
        this.mainClientResponse = users["data"];
        this.mainclientname = users["data"][0]["name"];
        this.editClientForm.patchValue({
          client_id : users["data"][0]["id"]
        },) ;
        console.log(this.mainClientResponse);
        this.getMainClientSpinner = false;
      },error =>{
        this.getMainClientSpinner = false;
        this.editClientForm.patchValue({
          client_id : this.currentClientToEdit["id"]
        },) ;
        this.mainclientname = "لا يوجد مستفيد برقم الهوية المدخل";
      }
    )
  }else{
    this.mainclientname="";
    

  }
}


//show select client modal var
ShowSelectClientModal:boolean = false; 
//show spinner for subclient list
subClientSpinner :boolean = true;
// ticket for subClient 
subClient:boolean;
// sub Clients Object
subClientsObject:any;
//pivotsObject
pivotsObject:any[];
//no subclient selected alert
subClientSelected:boolean = false;
pivotSelected:boolean = false;
// chose client type alert
noClientTypeSelcted:boolean = false;
// sumbit select subclient form
clientHospitalId;
selectSubClientDone=false;
selectSubClient(data,modal){
  // modal = this.modalService.open(modal, { centered: true,backdrop:"static",keyboard:false });

if(this.subClient == true){


  if(data.subClientName == ""){
    this.subClientSelected = true;
  }
  if(data.pivot == ""){
    this.pivotSelected = true;
  }
  if(data.subClientName !="" && data.pivot != ""){
    this.requesterId = data.subClientName;
    this.clientHospitalId =  data.pivot;
    // console.log("req id :"+this.requesterId);
    // console.log(data)
    this.ShowSelectClientModal = false;
    this.setClientIdService.updateId(String(this.requesterId));
  }
} else if(this.subClient == false){
  this.requesterId = this.clientObject["data"][0]["id"];
  this.clientHospitalId =  data.pivot;
  // console.log("req id :"+this.requesterId);
  console.log(data)
  this.ShowSelectClientModal = false;
  this.setClientIdService.updateId(String(this.requesterId));
}else if(this.subClient == undefined){
  this.noClientTypeSelcted = true;
}
this.ShowSelectClientModal = false;
this.clientIdToEdit = this.requesterId;

console.log("client id to edit :"+this.requesterId);
//hide modal

   //show client dl
   this.clientSearchDone = true;
   //show ticket info form
   this.selectClient = true;
   this.selectSubClientDone = true;
}
getSub(chose){

if(chose == "sub"){
  this.subClient = true;
  this.getSubClient(this.clientObject["data"][0]["id"])
}else{
  this.subClient = false;
}
}

// start of get sub client service method
getSubClient(id){
  this.pivotsObject = []
  this.getSubClientService.getSubClient(localStorage.getItem('token'),id).subscribe(data=>{
    this.subClientSpinner = false;
    this.subClientsObject = data["data"];
    // console.log(this.subClientsObject);
    for(let i=0;i<this.subClientsObject.length;i++){
    this.pivotsObject[i] = this.subClientsObject[i]["hospitals"];
    // console.log(this.subClientsObject[i]["hospitals"])
   

    }
  // console.log(this.pivotsObject);
  });
}
  

// get sources 
  //get sources spinner
  getSourcesSpinner:boolean = false ;
  //get sources object
   sources:any;
  // sources not selected alert 
  noSourceSelected:boolean = false;
  // get sources network error
  getSourcerError:boolean = false;

getSources(){
  // console.log("start of get sources")
  //show spinner
  this.getSourcesSpinner = true;
  //hide alert if exist
  this.getSourcerError = false;
    //catch current token from local storge
   let token:String = localStorage.getItem('token');
   this.getInfo.getSources().subscribe( data =>{
    this.sources = data["data"];
    // console.log(data)
    //hide spinner
    this.getSourcesSpinner = false;
    },
    (error)  =>{
      //hide spinner
      this.getSourcesSpinner = false;
      //incase of wrong token redirect to login
      if(error["status"] == "401"){
        localStorage.setItem('HollatLogin','false');
        localStorage.setItem('token',null);
        return this.router.navigateByUrl('/', {skipLocationChange: false}).then(()=>
        this.router.navigate(['/'])
         );
      //incase of wrong national id number 
      }else{
        this.getSourcerError = true;     
      }
     }
  );

}

//get ticket types
 //get ticket types spinner
 getTicketTypeSpinner:boolean = false;
 //ticket types object
 types:any;
 // types not selected alert
 noTypeSelected:boolean = false ;

getTicketTypes(){
//show spinner
this.getTicketTypeSpinner = true;
this.getTypes.getTicketTypes(localStorage.getItem('token')).subscribe(
  data => {
    //hide spinner
    this.getTicketTypeSpinner = false;
    this.types = data["data"];
  }
);

}

//get main reason based on type id
 
  //get main reason spinner
  getMainReasonSpinner:boolean = false;
  //main reasons object
  mainResons:any;
  //main Reason not selected alert
  noMainReasonSelected:boolean = false;
  //check if type selected or not to display main reason default
  noTypeSelectedForMainReasons:boolean = true;

getMainReason(id){
  this.noMainReasonSelectedforSub = true;
  this.noTypeSelectedForMainReasons = false;
  //show spinner
  this.getMainReasonSpinner = true;
this.getMainReasonService.getMainReasons(localStorage.getItem('token'),id).subscribe(
  data => {
    //hide spinner
    this.getMainReasonSpinner = false;

    this.mainResons = data["data"]; 
    if(this.mainResons.length == 0){
      this.mainResons[0]={"id": "0", "title_ar": "لايوجد سبب اتصال رئيسي لهذا النوع"};;
    }
 
  }
)
}

  //get sub reasons spinner
  getSubReasonsSpinner:boolean = false;
  //sub reasons object
  subReasons:any;
  //sub reason not slected alert
  noSubReasonsSelected:boolean = false;
  // check if main reason selected or not to display sub reason default
  noMainReasonSelectedforSub:boolean

getSubReason(id){
  //show spinner
  this.getSubReasonsSpinner = true;

  this.getSubReasonService.getSubReasons(localStorage.getItem('token'),id).subscribe(
    data => {
      this.getSubReasonsSpinner = false;
      this.subReasons = data["data"];
      this.noMainReasonSelectedforSub = false;
      if(this.subReasons.length == 0){
        this.subReasons[0]={"id": "0", "title_ar": "لايوجد سبب اتصال فرعي لهذا السبب الرئيسي"};;
        // console.log("no main reasons with this id" + this.mainResons["title_ar"]);
      }
    }
  )
}

// get priorities
//priorities spinner
prioritiesSpinner:boolean = true;
//priorities object
priorities:any;
//no priority selcted alert
noPrioritySelcted:boolean = false;
getPriorities(){
  this.getPrioritiesSetvice.getPriorities(localStorage.getItem('token')).subscribe(
    data =>{
      this.priorities = data["data"];
      this.prioritiesSpinner = false;

    }
  );
}

//get hospitals
//show spinner
getHospitalsSpinner:boolean = true;
//hospitals object
hospitals:any=[];
//alert
noHospitalAlert:boolean = false;
hospitalsforkjoinarray=[];
getHospitals(){
  let pages:number
  this.getHospitalsService.getHospitals(1).subscribe(
    data =>{
      pages = data["meta"]["last_page"];
      for(var reqpage = 0 ; reqpage < pages ; reqpage++){
        this.hospitalsforkjoinarray[reqpage] = this.getHospitalsService.getHospitalsByPage(reqpage+1);
      }
      this.getAllHospitalsWithFork();
   
    }
  );
}
getAllHospitalsWithFork(){
  forkJoin(this.hospitalsforkjoinarray).subscribe(results => {
   
    for(var responseindex = 0 ; responseindex < results.length ; responseindex++){
      this.hospitals.push(results[responseindex]["data"])
    }
    this.hospitals = [].concat.apply([],this.hospitals)

    this.getHospitalsSpinner = false;
  }); 
}

//get Statuses
// show spinner
getStatusesSpinner:boolean = true;
// Statuses object
statuses:any;
//alert
statusesAlert:boolean = false;
getStatues(){
  this.getStatuesService.getStatuses(localStorage.getItem("token")).subscribe(
    data=>{
      this.statuses = data["data"];
      this.getStatusesSpinner = false;
    }
  );
}
addTicketDoneModal : boolean = false ;
//add ticket submit form method

// "hospital_id": 2,
// 	"requester_id": 2
addTicketForm = new FormGroup({
  source_id : new FormControl('',Validators.required),
  hospital_id : new FormControl('',Validators.required),
  ticket_type_id : new FormControl('',Validators.required),
  main_reason_id : new FormControl('',Validators.required),
  sub_reason_id : new FormControl('',Validators.required),
  priority_id : new FormControl('1',Validators.required),
  client_hospital_id : new FormControl('',Validators.required),
  status_id : new FormControl('',Validators.required),
  details : new FormControl('',Validators.required),
  tags : new FormControl('',)

});
addTicketErrorMsg = "";
addTicketErrorAlert:boolean;
addedTicketNumber;
ticketObject:{};
oldSelctedTags:any[]=[];
newSelctedTags:any[]=[];
oldTagsIds:any[]=[];
addTicketspinner=true;
addTicket(modal){
  this.oldTagsIds=[];
  this.newSelctedTags=[];
  for(let i = 0; i<this.tags.length;i++){
    if(this.tagsFromBackEnd["data"].some(e => e.title === this.tags[i])){
      this.oldSelctedTags[i] =this.tagsFromBackEnd["data"].find(e => e.title === this.tags[i]);
    }else{
      this.newSelctedTags.push(this.tags[i]);
    }
  }
  for(let i = 0; i<this.oldSelctedTags.length;i++){
    this.oldTagsIds[i] = this.oldSelctedTags[i]["id"];
  }
  this.ticketObject = this.addTicketForm.value ;
  this.ticketObject["client_hospital_id"] = this.clientHospitalId;
  this.ticketObject["requester_id"] = this.requesterId
  this.ticketObject["client_id"] = this.clientObject["data"][0]["id"];
  this.ticketObject["tags"] = {"new": this.newSelctedTags,"ids": this.oldTagsIds};
  console.log(this.ticketObject)
  this.addTicketErrorAlert = false;
    this.storeService.addTicket(localStorage.getItem("token"),this.ticketObject).subscribe(data=>{
      // this.addTicketDoneModal= true;
      this.addedTicketNumber = data["id"];
      console.log(data)
      this.addTicketspinner=false;
      this.addTicketspinner=false;

    },er=>{
      this.addTicketErrorMsg = er["error"]["message"];
      this.addTicketErrorAlert = true;
      console.log(er)
    });
    this.modalService.open(modal, { centered: true}).result.then((result) => {
     this.router.navigateByUrl("/tickets");
     this.addTicketspinner=true;

    }, (reason) => {
     this.router.navigateByUrl("/tickets");
     this.addTicketspinner=true;

      
    });
}

closeAddTicket(){
  this.addTicketDoneModal = false;
  this.router.navigateByUrl('/tickets');
}
openEditClientModal(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.editClientDone = false;
    this.editClientLoading = false;
    this.editClientsSpinner = false;
  }, (reason) => {
    this.editClientDone = false;
    this.editClientLoading = false;
    this.editClientsSpinner = false;

    
  });
}
open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.evauluationForm.reset();
    location.reload();
    this.feedbackdone = false;
  }, (reason) => {
    this.evauluationForm.reset();
    location.reload();
    this.feedbackdone = false;

  });
}
  ViewTicketId
  currentOpendTicket
  viewOnly:boolean = false;
  getTicketLoader:boolean = false;
  editTicketObject:{};
  allMixedTags:any[]=[];
  uniqueTags:any[]=[];
  oldTagsIdToEdit:any[] =[];
  newsTagsToEdit:any[]=[];
  editTicket(){
    this.editTicketObject = this.editTicketForm.value;
    // this.editTicketObject["tags"] = {"new": [],"ids": []};
    this.editTicketObject["client_id"] = this.currentOpendTicket["data"][0]["client_id"]
    this.editTicketObject["requester_id"] = this.currentOpendTicket["data"][0]["requester_id"]
    this.allMixedTags = this.editTicketForm.get("tags").value.map(obj => obj.title);
    this.allMixedTags = this.allMixedTags.concat(this.tags);
    this.uniqueTags = this.allMixedTags.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })
    for(let counter = 0 ; counter< this.allMixedTags.length ; counter++){
      if(this.tagsFromBackEnd["data"].some(e => e.title === this.allMixedTags[counter])){
        // this.oldTagsIdToEditthis.tagsFromBackEnd["data"])
        this.oldTagsIdToEdit.push(this.tagsFromBackEnd["data"].find(e => e.title === this.allMixedTags[counter]));

      }else{
        this.newsTagsToEdit.push(this.allMixedTags[counter])
      }
    }
    this.oldTagsIdToEdit =  this.oldTagsIdToEdit.map(obj => obj.id)
    this.oldTagsIdToEdit = this.oldTagsIdToEdit.filter(function(elem, index, self) {
      return index === self.indexOf(elem) && elem != undefined;
    })
    console.log(this.uniqueTags);
    console.log(this.oldTagsIdToEdit);
    console.log(this.newsTagsToEdit);
      this.editTicketObject["tags"] = {"new": this.newsTagsToEdit,"ids": this.oldTagsIdToEdit};
    this.updateTicketService.updateTicket(localStorage.getItem("token"),this.ViewTicketId,this.editTicketObject).subscribe(
      data=>{
        console.log(data);
      }
    )
  }
  editTicketForm = new FormGroup({
    source_id : new FormControl("",),
    hospital_id : new FormControl('',),
    ticket_type_id : new FormControl('',),
    main_reason_id : new FormControl('',),
    sub_reason_id : new FormControl('',),
    priority_id : new FormControl('',),
    client_hospital_id : new FormControl('',),
    status_id : new FormControl('',),
    details : new FormControl('',),
    client_id : new FormControl('',),
    requester_id : new FormControl('',),
    tags: new FormControl('',)


    });

  selectedPriorityId: number;
  currentOpendTicketTags:any[];
  getCurrentTags(value){
    console.log(value)
  }
  deleteClickedTags(index){
    console.log("index to delete = "+index);
    // delete this.currentOpendTicketTags[index];
    this.currentOpendTicketTags.splice(index, 1);
    console.log(this.currentOpendTicketTags)
  }
  nationalIdTypes;
  nationalities;
  clientTypes;
  currentClientsHospitalsArray:any[] = [];
  currentClientsHospitalsArrayWithName:any[] = [];
  ratedTicket:boolean;
  clientBirthDate:any;
  ngOnInit() {
   this.ViewTicketId =  this.route.snapshot.paramMap.get('id');
   if(this.ViewTicketId != null){
    this.getTicketLoader = true;
   }
    //call get sources method 
    this.getSources();
      // call get ticket types method
      this.getTicketTypes();
      this.noMainReasonSelectedforSub = true;
      //call get priority method
      this.getPriorities();
      // call get hospitals method
      this.getHospitals();
      // call get statuses method
      this.getStatues();
      this.getTags()
    this.currentOpendTicketTags = ["الحد الجنوبي"];
    this.getEvauluationQes();

    // console.log("ticket id = " +this.ViewTicketId);
    this.getNationalIdTypesService.getNationalid(localStorage.getItem("token")).subscribe(data=>{
      this.nationalIdTypes = data;
    })
    this.getNationalitiesService.getNationalities(localStorage.getItem("token")).subscribe(data=>{
      this.nationalities = data;
    })
    this.getClientTypesService.getClientTypes(localStorage.getItem("token")).subscribe(data=>{
      this.clientTypes = data;
    })  
    if(this.ViewTicketId != null){
      // this.getEvauluationQes();

      this.getTags();
      this.getPriorities();
      this.getSources();
      // call get ticket types method
      this.getTicketTypes();
      //call get priority method
      this.getPriorities();
      // call get hospitals method
      this.getHospitals();
      // call get statuses method
      this.getStatues();
     
      // this.setClientIdService.updateId(String(this.currentOpendTicket.data[0].client.id));
      this.getTags()
      this.getTicketService.showTicket(localStorage.getItem("token"),this.ViewTicketId).subscribe(data=>{
        this.currentOpendTicket = data;
        this.currentRate = data["data"][0]["rate"];
        if(this.currentRate == null){
          this.ratedTicket = false
        }else{
          this.ratedTicket = true

        }

        if(this.currentOpendTicket["data"][0]["status"]["main_status_id"] == 3)
        {
           this.displayEvaluationButton = true;  
        }

        // to display edit button based on permissions
        if(this.currentOpendTicket["data"][0]["status"]["main_status_id"] != 4 && this.isGranted('Edit Ticket'))
        {
           this.displayEditButton = true;  
        }
        if(this.currentOpendTicket["data"][0]["status"]["main_status_id"] == 4 && this.isGranted('Edit Closed Ticket'))
        {
           this.displayEditButton = true;  
        }
        this.clientIdToEdit = this.currentOpendTicket["data"][0]["client"]["id"];
        this.currentOpendTicketTags = this.currentOpendTicket["data"][0].tags;
        this.showClientService.showClient(localStorage.getItem("token"),this.clientIdToEdit).subscribe(data=>{
          this.currentClientToEdit = data;
          // console.log(this.currentClientToEdit);
          this.editClientForm.get("name").patchValue(this.currentClientToEdit["name"]);
          this.editClientForm.get("mobile").patchValue(this.currentClientToEdit["mobile"]);
          this.editClientForm.get("national_id_type_id").patchValue(this.currentClientToEdit["national_id_type_id"]);
          this.editClientForm.get("national_id").patchValue(this.currentClientToEdit["national_id"]);
          this.editClientForm.get("telephone").patchValue(this.currentClientToEdit["telephone"]);
          this.editClientForm.get("nationality_id").patchValue(this.currentClientToEdit["nationality_id"]);
          this.editClientForm.get("address").patchValue(this.currentClientToEdit["address"]);
          this.editClientForm.get("email").patchValue(this.currentClientToEdit["email"]);
          this.editClientForm.get("ministry_member").patchValue(this.currentClientToEdit["ministry_member"].toString());
          this.editClientForm.get("gender").patchValue(this.currentClientToEdit["gender"]);
          this.editClientForm.get("client_type_id").patchValue(this.currentClientToEdit["client_type_id"]);
          this.editClientForm.controls.birthdate.setValue({year:parseInt(this.currentClientToEdit["birthdate"].substring(0,4)),month:parseInt(this.currentClientToEdit["birthdate"].substring(5,7)),day:parseInt(this.currentClientToEdit["birthdate"].substring(8))});
          this.editBirthDateModel = {year:this.currentClientToEdit["birthdate"].substring(0,4),month:this.currentClientToEdit["birthdate"].substring(5,7),day:this.currentClientToEdit["birthdate"].substring(8)}
          this.clientBirthDate = {year:this.currentClientToEdit["birthdate"].substring(0,4),month:this.currentClientToEdit["birthdate"].substring(5,7),day:this.currentClientToEdit["birthdate"].substring(8)}

          for(let i = 0; i < this.currentClientToEdit["hospitals"].length ; i++){
            this.currentClientsHospitalsArrayWithName[i] = {hospital_id : this.currentClientToEdit["hospitals"][i]["id"],file_number : this.currentClientToEdit["hospitals"][i]["pivot"]["file_number"],title_ar : this.currentClientToEdit["hospitals"][i]["title_ar"]}            
            this.currentClientsHospitalsArray[i] = {hospital_id : this.currentClientToEdit["hospitals"][i]["id"],file_number : this.currentClientToEdit["hospitals"][i]["pivot"]["file_number"]  }
          }

          this.editClientForm.get("hospitals").patchValue(this.currentClientsHospitalsArray);
   


        });
        // for evaluation
        // if(this.currentOpendTicket["data"][0].status[0].id == 1)
        // {
        //   this.displayEvaluationButton = true;
        //   this.questionsService.getAll(localStorage.getItem("token")).subscribe(res => {
        //     console.log('question res', res);
        //   });
        // }
      
        this.viewOnly = true;
        // console.log("source id should be" + data["data"][0].source.id);
        this.editTicketForm.get("source_id").patchValue(data["data"][0].source.id);
        this.editTicketForm.get("ticket_type_id").patchValue(data["data"][0].ticket_type_id);
        this.getMainReason(data["data"][0].ticket_type_id)
        this.editTicketForm.get("main_reason_id").patchValue(data["data"][0].main_reason_id);
        this.getSubReason(data["data"][0].main_reason_id);
        this.editTicketForm.get("sub_reason_id").patchValue(data["data"][0].sub_reason_id);
        // this.editTicketForm.patchValue({'priority_id':data["data"][0].priority_id})
        this.selectedPriorityId = data["data"][0].priority_id;
        this.editTicketForm.get("priority_id").patchValue(data["data"][0].priority_id);
        this.editTicketForm.get("hospital_id").patchValue(data["data"][0].hospital_id);
        this.editTicketForm.get("details").patchValue(data["data"][0].details);
        this.editTicketForm.get("client_hospital_id").patchValue(data["data"][0].client_hospital_id);
        this.editTicketForm.get("status_id").patchValue(data["data"][0]["status"]["id"]);
        this.editTicketForm.get("client_id").patchValue(data["data"][0].client_id);
        this.editTicketForm.get("tags").setValue(this.currentOpendTicketTags);

        this.editTicketForm.get("requester_id").patchValue(data["data"][0].requester_id);
        this.setClientIdService.updateId(this.currentOpendTicket["data"][0].client_id);

        // console.log("tagsfrom opend ticket =")
        // console.log(this.currentOpendTicket["data"][0].tags);
        this.getTicketLoader=false;

      })
    
    
    }
    
  

  }
  // start of Evaluation part
  emptyDetails="empty-text";
  inputNotSolvedTicket(value){
    // console.log(value);
    if(value.length == 0 ){
      this.emptyDetails = "empty-text";
    }else{
      this.emptyDetails = "";
    }
  }
  isCollapsed = false;
  evauluations:any;
  getEvauluationQes(){
    this.getEvauluationQesService.getEvauluations(localStorage.getItem("token")).subscribe(data=>{
     
      this.evauluations = data["data"];
      for(let i=0;i<this.evauluations.length;i++){
        for(let x=0;x<this.evauluations[i]["questions"].length;x++){
          // (this.evauluationForm.get("questions") as FormArray).push(new FormControl(this.evauluations[i]["questions"][x]["id"]));
          // (this.evauluationForm.get("questions") as FormArray).push(new FormControl(this.evauluations[i]["questions"][x]["id"]));          
          if(this.evauluations[i]["questions"][x]["id"] !="17"){
            (this.evauluationForm.get("questions") as FormArray).push(this.formBuilder.group({
              ticket_id: [this.route.snapshot.paramMap.get('id'),''],
              question_id: [this.evauluations[i]["questions"][x]["id"],],
              closed_ended_id: ['',],
          }));
          }else if(this.evauluations[i]["questions"][x]["id"] == "17"){
            (this.evauluationForm.get("questions") as FormArray).push(this.formBuilder.group({
              ticket_id: [this.route.snapshot.paramMap.get('id'),''],
              question_id: [this.evauluations[i]["questions"][x]["id"],],
              closed_ended_id: ['',],
              details:['',]
          }))
          }
        
        
          
        }
      }
    });

   
    
  }
  evauluationForm = new FormGroup ({
    questions : new FormArray([
      // this.formBuilder.control('')
    ])
  });
  get questions() {
    return this.evauluationForm.get('questions') as FormArray;
  }
  addQuestion() {
    this.questions.push(this.formBuilder.control(''));
  }
  showDetailsTextarea:boolean= false;
  solvedId:any;
  showNotSolvedDetails(event){
    console.log(event.target.value)
    this.solvedId = event.target.value;
    if(event.target.value == "37"){
      this.showDetailsTextarea = true;
      // this.filterdFeedback["questions"][0]["closed_ended_id"] = "37";
    }else{
      this.showDetailsTextarea = false;
      // this.filterdFeedback["questions"][0]["closed_ended_id"] = "36";

    }
  }
  filterdFeedback:any;
  filterAnsewrs:any;
  questionsobject:any;
  feedbackdone:boolean = false;
  submitFeedback(form){
    console.log("test submit feedback")
    this.filterdFeedback = form.value;
    if(this.solvedId == "36"){
      this.filterdFeedback["questions"][0]["details"] = "تم حل التذكرة";
    }
    
    this.questionsobject = this.evauluations.map(function(a) {return a.questions;})
    this.questionsobject = this.questionsobject[0].concat(this.questionsobject[1],this.questionsobject[2],this.questionsobject[3])
    console.log(this.questionsobject)
  
    for(var questions = 1 ; questions < this.filterdFeedback.questions.length ; questions++){
      for(var closedended = 0 ; closedended < 5 ; closedended ++ ){
        if(this.filterdFeedback.questions[questions]["question_id"] == this.questionsobject[questions]["id"]){
          if(this.filterdFeedback.questions[questions]["closed_ended_id"] == this.questionsobject[questions]["closed_endeds"][closedended]["option"]){
            this.filterdFeedback.questions[questions]["closed_ended_id"] = this.questionsobject[questions]["closed_endeds"][closedended]["id"]
            }          
          }
        }
    }

    for(var questions = 1 ; questions < this.filterdFeedback.questions.length ; questions++){
      if ( this.filterdFeedback.questions[questions]["closed_ended_id"] === "") {
        this.filterdFeedback.questions.splice(questions, 1); 
      }
    }
    this.filterdFeedback = this.filterdFeedback.questions.filter(function (el) {
      return el.closed_ended_id != "";
      });
    console.log(this.filterdFeedback)
    for(var counter = 0 ; counter < this.filterdFeedback.length ; counter++){
      this.storeAnswerService.storeAnswer(this.filterdFeedback[counter]).subscribe(data=>{
        console.log(data);
      })
    }
    this.feedbackdone = true;
  }

  openEvaluation(content){
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.evauluationForm.reset();
    }, (reason) => {
        this.evauluationForm.reset();
    });
  }

  clientHospitals;

  //calling api for get client
  clientSearch(data,modal){
this.selectSubClientDone = false;
    let token:String = localStorage.getItem('token');
    //can not contain space check
    if(typeof data.national_id == "string" || data.national_id == null){
      this.nationalIdInputError = true;
       //hide current client dl if exist
       this.clientSearchDone = false;
       //hide false national id alert of exist
      this.falseNationalId = false;
    }else{
      //in case of valid national id number
      //hide alert if exist
      this.nationalIdInputError = false;
      this.falseNationalId = false;
      //show spinner
      this.clientSearchLoading = true;
      //hide current client dl if exist
      this.clientSearchDone = false;
      //start of get client service 
      this.getClientService.getClient(data.national_id,token)
      
      .subscribe(
         data =>{
          //hide spinner
          this.clientSearchLoading = false;
          //set client object value
          this.clientObject = data; 
          // console.log(this.clientObject);
          this.clientHospitals = data["data"][0]["hospitals"];
          // console.log(this.clientHospitals);

       
          if(this.clientObject["data"][0]["client_type_id"]==1){
            // this.ShowSelectClientModal = true;
            this.modalService.open(modal, { centered: true,backdrop:"static",keyboard:false });
          }
       
         },
        (error)  =>{
          //hide spinner
          this.clientSearchLoading = false;
          //incase of wrong token redirect to login
          if(error["status"] == "401"){
            localStorage.setItem('HollatLogin','false');
            localStorage.setItem('token',null);
            return this.router.navigateByUrl('/', {skipLocationChange: false}).then(()=>
            this.router.navigate(['/'])
             );
          //incase of wrong national id number 
          }else if(error["status"] == "422"){
            this.falseNationalId = true;
          }
         }
      ); 
    }
      
  }

}
