import { ApiResponse } from 'src/app/shared/models/api-response.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { GetTicketsService } from './../../../shared/services/api/get-tickets.service';
import { Component, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DeleteTicketService } from '../../../shared/services/api/delete-ticket/delete-ticket.service';
import { MergeTicketsComponent } from './merge-tickets/merge-ticket.component';
import { GetStatuesService } from 'src/app/shared/services/api/ticketinfo/get-statues.service';
import { GetTicketTypesService } from 'src/app/shared/services/api/ticketinfo/get-ticket-types.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetRolesService } from '../../../shared/services/api/ticketinfo/get-roles.service';
import { StoreTicketUsersService } from '../../../shared/services/api/ticketinfo/store-ticket-users.service';
import { GetUsersService } from '../../../shared/services/api/ticketinfo/get-users.service';
import { GetPrioritiesService } from '../../../shared/services/api/ticketinfo/get-priorities.service';
import { GetServiceService } from '../../../shared/services/api/ticketinfo/get-service.service';
import { ExportTicketsService } from '../../../shared/services/api/export-tickets.service';
import { UpdateTicketStatusService } from 'src/app/shared/services/api/ticketinfo/update-ticket-status';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { PermisionsService } from 'src/app/base-omponent/permissions-service';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';




@Component({
  selector: 'app-tickets-component',
  templateUrl: './tickets-component.component.html',
  styleUrls: ['./tickets-component.component.scss'],
  providers: [GetTicketsService]
})
export class TicketsMainComponent extends AppBaseComponent implements OnInit, OnChanges   {
  ticketsObject;
  selectedTicketsIds = [];
  statuses = [];
  selectedStatusId = 0;
  token = '';
  ticketTypes = [];
  priorities:any = [];
  sources:any = [];

  selectedTicketTypeId = 0;
  @ViewChild('mergeTickets',{static:false}) mergeTickets: MergeTicketsComponent;
  
  constructor(
    private getTicketService : GetTicketsService,
    private router:Router,
    private deleteTicket:DeleteTicketService,
    private getStatuesService : GetStatuesService,
    private getTypesService:GetTicketTypesService,
    private modalService: NgbModal,
    private getRolesService:GetRolesService,
    private storeTicketUsersService:StoreTicketUsersService,
    private getUsersService:GetUsersService,
    private gettPrioritiesService:GetPrioritiesService,
    private getServiceService:GetServiceService,
    private exportTicketsService:ExportTicketsService,
    private updateTicketStatusService: UpdateTicketStatusService,
    private permisionList : PermisionsService,
    private translate: TranslateService
  ) {
    super(translate);
    console.log( this.isGranted('Add Ticket'));
  }
  ticketResponse:any;
  ticketObjectWithPagintation;
  //pagintation
    //table pageintation
    itemsPerPage: number=10;
    totalItems: any;
    page=1;
    paginationMaxSize = 1000
    collectionSize = 20;
    previousPage: any;
    pageSize :number = 10;

    changePage(e){
      this.page = parseInt(e.target.text);
        // this.load(this.page,this.keyWord);
      }
  getTicketsreq(){
    this.getTicketService.getTickets(1)
    .subscribe(
       data =>{
         this.ticketResponse = data;
         this.itemsPerPage = data["meta"]["per_page"];
         this.totalItems = data["meta"]["total"];
         this.page = data["meta"]["current_page"];

         this.ticketObjectWithPagintation = data["data"];
      
         for (let i = 0; i < this.ticketsObject.length ; i++) {
          if(this.ticketsObject[i]['status'] == null){
           
            this.ticketsObject[i]['status'] = {"title_en": "-", "title_ar": "-","updated_at":"-"};
         
          }
          if(this.ticketsObject[i]['assigned_user'] == null){
            this.ticketsObject[i]['assigned_user']= {"name": "",};

          }
        }
        console.log(data)
       },
       error =>{
        // localStorage.setItem('HollatLogin','false');
        // localStorage.setItem('token',null);

        // return this.router.navigateByUrl('/', {skipLocationChange: false}).then(()=>
        //        this.router.navigate(['/'])
        //         );
       }
      ); 
  }
  ticketSearchByIdForm = new FormGroup({
    id : new FormControl(null,),
  });
 
  ticketSearchById(){
    this.noResult = false;

    this.getTicketService.getTicketsWithParams(this.ticketSearchByIdForm.value).subscribe(data=>{
      console.log(data);
      this.ticketResponse = data;
      this.ticketObjectWithPagintation = data["data"];
      this.filterdTicketResponse.data = data["data"];
    },error =>{
      this.ticketResponse.data = []
      this.noResult = true;
    })
  }
  ngOnInit() {

    this.permisionList.getAll().subscribe(res => {
      console.log('perm', res);
    })

    this.token = localStorage.getItem('token');
     this.getTicketsreq()
      this.getStatuses();
      this.getTicketTypes();
      this.getRoles();
      this.getUsers();
      this.getpriorities();
      this.getSources();
      //temp solution for sidenav issue
    if(document.getElementById("sidebar").style.width == "230px"){
      document.getElementById("content-wrapper").style.marginRight = "230px";
    } else {
      document.getElementById("content-wrapper").style.marginRight = "0px";
    }
  } 
  
  

  ticketSearchForm = new FormGroup({
    status_id : new FormControl(null,),
    file_number : new FormControl(null,),
    priority_id : new FormControl(),
    ticket_type_id : new FormControl(null,),
    source_id : new FormControl(null,)



  });
  formatedSearchObject:{} = {};
  noResult:boolean=false;
  filterdTicketResponse;
  filterdTicketsShow = false;
  ticketSearch(){
    this.noResult = false

    this.formatedSearchObject = this.ticketSearchForm.value;
    let propNames = Object.getOwnPropertyNames(this.formatedSearchObject);
    for (var i = 0; i < propNames.length; i++) {
      var propName = propNames[i];
      if (this.formatedSearchObject[propName] == "" || this.formatedSearchObject[propName] == null|| this.formatedSearchObject[propName] == "null") {
        delete this.formatedSearchObject[propName];
      }
    }
    console.log(this.formatedSearchObject);
    this.getTicketService.search(this.formatedSearchObject,1).subscribe(data=>{
      console.log(data);
      this.filterdTicketResponse = data
      this.ticketsObject = data["data"];
      if(this.ticketsObject.length == 0){
        this.noResult = true
      }
      this.filterdTicketsShow = true;
    })
  }


  closeTicket(closeContent, closeSuccesscontent, selectTicketsContent) {
    if(this.selectedTicketsIds.length == 0){
      this.modalService.open(selectTicketsContent, {ariaLabelledBy: 'modal-basic-title'})
      .result.then((result) => {}, (reason) => { });
    }else{
      this.modalService.open(closeContent, {ariaLabelledBy: 'modal-basic-title'})
      .result.then((result) => {
        this.modalService.dismissAll();
        if(result == 'Save'){
          this.closeTickets(closeSuccesscontent);
        }
      }, (reason) => {
    });
    }
  }

  closeTickets(closeSuccesscontent){
    this.updateTicketStatusService.closeTickets({'ids': this.selectedTicketsIds})
    .subscribe(res => {
      this.modalService.open(closeSuccesscontent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        }, (reason) => {
      });
      this.refreshTickets();
      this.selectedTicketsIds = [];
    },error => {
      this.selectedTicketsIds = [];
    });
  }

  getTicketTypes(){
    this.getTypesService.getTicketTypes(this.token).subscribe(res => {
      this.ticketTypes = res["data"];
    });
  }
  getSources(){
    this.getServiceService.getSources().subscribe(res => {
      this.sources = res["data"];
      console.log(res)
    });
  }
  getpriorities(){
    this.gettPrioritiesService.getPriorities(this.token).subscribe(res => {
      this.priorities = res["data"];
    });
  }
  emptySearchForm(){
    this.getTicketsreq();
    this.filterdTicketsShow = false;
    this.ticketSearchForm.reset();
    this.ticketSearchByIdForm.reset();
  }
  getStatuses(){
    this.getStatuesService.getStatuses(this.token).subscribe(res => {
      this.statuses = res["data"];
      console.log('res', res);
    });
  }
  deleteTickets(){
    this.deleteConfirm = true;
    console.log(this.selectedToDelete);
     for(let coutner = 0; coutner < this.selectedToDelete.length; coutner++){

        // if(this.selectedToDelete[coutner] == this.ticketsObject[coutner].id ){
        //   delete this.ticketsObject[coutner]
        //   this.refresh=true;
        // }
        
        this.deleteTicket.deleteTicket(localStorage.getItem("token"),this.selectedToDelete[coutner]).subscribe(data=>{
          console.log(data)
        })
        console.log(this.selectedToDelete[coutner]);
      }
      this.redirectTo('/tickets');
      this.refresh=true;
      this.getTicketsreq();
    
  }
  closeDeleteTicketModal(){
    this.showDeleteAlert = false;
  }
  selectedTickets:any;
  selectedToDelete:any;
  refresh:boolean=true;
  activeButton:any;
  handOverModal:boolean=false;
  showDeleteAlert:boolean=false;
  deleteConfirm:boolean=false;
  redirectTo(uri:string){
    this.router.navigateByUrl('/dummy', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));}
  ticketsActions(form: NgForm, $event:Event){
    this.refresh=false
    this.activeButton = document.activeElement.id;
    this.selectedTickets = form.value;
    if(this.activeButton == "delete"){
      console.log("delete");
      // this.redirectTo('/tickets');
      this.refresh=true
      this.getTicketsreq();
      
      for (var propName in this.selectedTickets) { 
        if (this.selectedTickets[propName] === null || this.selectedTickets[propName] === undefined || this.selectedTickets[propName] === "" || this.selectedTickets[propName] === false) {
          delete this.selectedTickets[propName];
        

        }
        this.selectedToDelete = Object.keys(this.selectedTickets)
      }
      console.log(this.selectedToDelete);
      if(this.selectedToDelete.length == 0){
        console.log("empty object to delete")
        
      }else if(this.selectedToDelete.length > 0){
        this.showDeleteAlert = true;
        console.log("need to show alert dlete")
        
      }
    
      // for(let coutner = 0; coutner < this.selectedToDelete.length; coutner++){

      //   if(this.selectedToDelete[coutner] == this.ticketsObject[coutner].id ){
      //     delete this.ticketsObject[coutner]
      //     this.refresh=true;
      //   }
        
      //   this.deleteTicket.deleteTicket(localStorage.getItem("token"),this.selectedToDelete[coutner]).subscribe(data=>{
      //     console.log(data)
      //   })
      //   console.log(this.selectedToDelete[coutner]);
      // }

      // // window.location.reload();
      // this.redirectTo('/tickets');
      // this.refresh=true
      // this.getTicketsreq();
      
    }

    if(this.activeButton == "assign"){
      console.log("assign");
      
      this.refresh=true;
      for (var propName in this.selectedTickets) { 
        if (this.selectedTickets[propName] === null || this.selectedTickets[propName] === undefined || this.selectedTickets[propName] === "" || this.selectedTickets[propName] === false) {
          delete this.selectedTickets[propName];
        }
        this.selectedToDelete = Object.keys(this.selectedTickets)
      }
      if(Object.entries(this.selectedTickets).length != 0){
        this.handOverModal=true;
      }
      console.log(this.selectedTickets);
    }
  }
  exportForm = new FormGroup({
    extension : new FormControl('',Validators.required),
  });
  requestes:any=[];
  exportObject:any=[];
  objectToExport={};
  exportdone=false;
  opendExportModal(modal){
    this.modalService.open(modal, { centered: true }).result.then((result) => {
      this.exportForm.reset();
      this.objectToExport ={};
      this.exportdone=false;
      location.reload()
    },(reason)=>{
      this.exportForm.reset();
      this.objectToExport ={};
      this.exportdone=false;
      location.reload()



    })
  }
  exportClients(){
    console.log( this.filterdTicketResponse);
    console.log("clicked export");
    this.exportdone=true;
    for(var reqpage = 0 ; reqpage < this.filterdTicketResponse.meta.last_page ; reqpage++){
      this.requestes[reqpage] = this.getTicketService.search(this.formatedSearchObject,(reqpage+1))      
    }
    forkJoin(this.requestes).subscribe(results => {
      for(var responseindex = 0 ; responseindex < results.length ; responseindex++){
        this.exportObject.push(results[responseindex]["data"])
      }
      this.exportObject = [].concat.apply([],this.exportObject)
      this.exportObject = this.exportObject.map(item => item.id)

      this.objectToExport["client_ids"] = this.exportObject as Array<number>;
      this.objectToExport["extension"] = this.exportForm.controls.extension.value;
      console.log(this.objectToExport);
      if(this.exportForm.controls.extension.value == "xlsx"){
        this.exportTicketsService.export(this.objectToExport).subscribe(response=>{
          this.downloadFile(response, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        });
      }else if(this.exportForm.controls.extension.value == "pdf"){
        this.exportTicketsService.export(this.objectToExport).subscribe(response=>{
          this.downloadFile(response, "application/pdf");
          this.exportdone=true;

        })
      }
     
      
    });
    
  
  }
  downloadFile(data,type) {
    const blob = new Blob([data], { type: type });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }
  ngOnChanges(changes: SimpleChanges){
    if (changes['deleteConfirm'] && changes['deleteConfirm'].currentValue){
      console.log("tickets to delete");
      console.log(this.selectedToDelete);

    }
  }
  closeHandOverModal(){
    this.handOverModal=false;
    this.rolesToSubmit=[];
    this.groupHandOver = false;
    this.handOverDone=false;
    this.userHandOver=false;
  }
  groupHandOver:boolean=false;
  userHandOver:boolean=false;
  handOverForm = new FormGroup({
    role_id : new FormControl(null,Validators.required),
  });
  roles:any;
  users:any;
  getRoles(){
    this.getRolesService.geRoles(localStorage.getItem("token")).subscribe(data =>{
      this.roles=data["data"];
    });
  }

  getUsers(){
    this.getUsersService.getUsers(localStorage.getItem("token")).subscribe(data =>{
      this.users=data["data"];
    },error=>{
      console.log("getusers ss error");
      console.log(error);
    });
  }
  selectHandOver(value){
    console.log(value);
    if(value == "gorup"){
      this.groupHandOver=true;
      this.userHandOver = false;
    }else{
      this.groupHandOver=false;
      this.userHandOver = true;
    }
    
  }
  rolesToSubmit:{ ticket_id: string, role_id: string }[] = [];
  ticketsIdsArray:any;
  handOverSpinner:boolean = false;
  handOverDone=false;

  groupHandOverSubmit(value){
    this.handOverSpinner=true;
    console.log(value);
    this.ticketsIdsArray = Object.keys(this.selectedTickets);
    for(let counter = 0 ; counter<Object.entries(this.selectedTickets).length ; counter++){
      this.rolesToSubmit.push({ticket_id:this.ticketsIdsArray[counter],role_id:value.role_id});
      this.storeTicketUsersService.storeUser(localStorage.getItem("token"),this.rolesToSubmit[counter]).subscribe(data =>{
        console.log(data);
        if(counter == Object.entries(this.selectedTickets).length - 1 ){
          this.handOverSpinner = false;
          this.handOverDone=true;
        }
      });
    } 
    console.log(this.rolesToSubmit);
    
    
  }
  userhandOverForm = new FormGroup({
    user_ids : new FormControl(null,Validators.required),
  });
  usersToSubmit:{ ticket_id: string, user_ids: String[] }[] = [];
  userHandOverSubmit(value){
    this.handOverSpinner=true;
    console.log(value);
    this.ticketsIdsArray = Object.keys(this.selectedTickets);
    for(let counter = 0 ; counter<Object.entries(this.selectedTickets).length ; counter++){
      this.usersToSubmit.push({ticket_id:this.ticketsIdsArray[counter],user_ids:[value.user_ids]});
        console.log(this.usersToSubmit);
      this.storeTicketUsersService.storeUser(localStorage.getItem("token"),this.usersToSubmit[counter]).subscribe(data =>{
        console.log(data);
        if(counter == Object.entries(this.selectedTickets).length - 1 ){
          this.handOverSpinner = false;
          this.handOverDone=true;
        }
      });
    } 
    console.log(value);
    
    
  }

  openMergePopup(){
    this.mergeTickets.show(this.selectedTicketsIds);
  }
  selectAllTickets:boolean=false;
  selectAllTicketsFilterd:boolean=false;
  selectTickets(ticket){

    this.selectedTicketsIds.push(ticket.id);
  }
  selectAll(){
    this.selectAllTickets =! this.selectAllTickets;
    this.selectedTicketsIds = this.ticketObjectWithPagintation.map(function(a) {return a.id;})
    console.log(this.selectedTicketsIds)
  }
  selectAllFilterd(){
    this.selectAllTicketsFilterd =! this.selectAllTicketsFilterd;
    this.selectedTicketsIds = this.filterdTicketResponse.data.map(function(a) {return a.id;})
    console.log(this.selectedTicketsIds)
  }

  refreshTickets(){
    this.getTicketsreq();
  }

  changeTicketsPage(page){
    console.log(parseInt(page));
   
    this.getTicketService.getTickets(parseInt(page)).subscribe(data=>{
      this.ticketResponse.data = data["data"];
      this.ticketObjectWithPagintation = data["data"];
      console.log(this.ticketObjectWithPagintation)
      for (let i = 0; i < this.ticketObjectWithPagintation.length ; i++) {
      //  if(this.ticketsObject[i]['status'].length == 0){
        
      //    this.ticketsObject[i]['status'][0] = {"title_en": "-", "title_ar": "-","updated_at":"-"};
      
      //  }
       if(this.ticketObjectWithPagintation[i]['assigned_user'] == null){
         this.ticketObjectWithPagintation[i]['assigned_user'] = {"name": "",};

       } 
      console.log("index number = "+i)
     }
     this.selectAllTickets = false;
    })

  }
  changeFilterdTicketsPage(page){
    console.log(parseInt(page));
    this.noResult = false

    this.formatedSearchObject = this.ticketSearchForm.value;
    let propNames = Object.getOwnPropertyNames(this.formatedSearchObject);
    for (var i = 0; i < propNames.length; i++) {
      var propName = propNames[i];
      if (this.formatedSearchObject[propName] == "" || this.formatedSearchObject[propName] == null|| this.formatedSearchObject[propName] == "null") {
        delete this.formatedSearchObject[propName];
      }
    }
    console.log(this.formatedSearchObject);
    this.getTicketService.search(this.formatedSearchObject,parseInt(page)).subscribe(data=>{
      console.log(data);
      this.filterdTicketResponse = data
      this.ticketsObject = data["data"];
      if(this.ticketsObject.length == 0){
        this.noResult = true
      }
      this.filterdTicketsShow = true;
      this.selectAllTicketsFilterd = false;
    })
  }
}
