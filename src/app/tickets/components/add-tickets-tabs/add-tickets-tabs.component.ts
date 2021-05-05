import { client } from './../../../client/clients/client';
import { Component, OnInit, Input } from '@angular/core';
import { Reply, IReply } from 'src/app/shared/models/reply.model';
import { ClientType } from 'src/app/shared/models/client-type.model';
import { GetTicketTypesService } from '../../../shared/services/api/ticketinfo/get-ticket-types.service';
import { GetHospitalsService } from '../../../shared/services/api/ticketinfo/get-hospitals.service';
import { GetStatuesService } from '../../../shared/services/api/ticketinfo/get-statues.service';
import { GetPrioritiesService } from './../../../shared/services/api/ticketinfo/get-priorities.service';
import {SetClientIdService} from './../../../shared/services/clients/set-client-id.service';
import { Note, INote } from 'src/app/shared/models/note.model';
import { ExternalUnit } from 'src/app/shared/models/external-unit.model';
import { Department } from 'src/app/shared/models/department.model';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap/tabset/tabset';
import { TranslateService } from '@ngx-translate/core';
import { GenericCrudService } from 'src/app/shared/services/api/generic-crud.service';
import { ApiResponse } from 'src/app/shared/models/api-response.model';
import { ActivatedRoute, Params } from '@angular/router';
import { KnowledgeBaseService } from 'src/app/shared/services/knowledge-base.service';
import {GetServiceService} from './../../../shared/services/api/ticketinfo/get-service.service'

import {FormControl} from '@angular/forms';
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { GetTicketsService } from '../../../shared/services/api/get-tickets.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { GetNotesService } from '../../../shared/services/api/get-notes/get-notes.service';
import { MergeService } from 'src/app/shared/services/api/merge-tickets/merge.service';
import { RelatedTicketsService } from 'src/app/shared/services/api/merge-tickets/related-tickets.service';
import { StoreNoteService } from '../../../shared/services/api/ticketinfo/store-note.service';
import { GetRepliesService } from '../../../shared/services/api/ticketinfo/get-replies.service';
import { DeleteNoteService } from '../../../shared/services/api/ticketinfo/delete-note.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateNoteService } from '../../../shared/services/api/ticketinfo/update-note.service';

@Component({
  selector: 'app-add-tickets-tabs',
  templateUrl: './add-tickets-tabs.component.html',
  styleUrls: ['./add-tickets-tabs.component.scss']
})
export class AddTicketsTabsComponent implements OnInit {

  public replies: Reply[] = [];

  public pageSize :number = 5;
  relatedPageSize = 5;
  mergedTicketsData : any;
  public paginationMaxSize :number = 5;

  public notes: Note[] = [];
  public note: INote=  {};
  public repliesResponse: ApiResponse<Reply[]>  =new ApiResponse<Reply[]>() ;

  public externalUnits: ExternalUnit[] = [];
  public departments:Department[]=[];
  public isLoading = true;
  token:string;
  categoriesData: any;
  isCollapsed: boolean = false; //for Accordion
  pastTicketsLoaded:boolean = true;
  ticketspage = 10;
  // pageSize = 5;
  keyWord = '';
  cliendId: string;
  @Input() viewOnly:boolean;
  @Input() ticketObject:any;
  public minDate: Date = void 0;
  constructor( private translate: TranslateService,
               private  genericCrudService: GenericCrudService,
               private route: ActivatedRoute,
               private _KnowledgeBaseService: KnowledgeBaseService,
               private getSourcesService:GetServiceService,
               private getTypes:GetTicketTypesService,
               private getHospitals:GetHospitalsService,
               private getStatuesService:GetStatuesService,
               private getPrioritiesService:GetPrioritiesService,
               private clientIdService:SetClientIdService,
               private getTicketsService:GetTicketsService,
               private getNotesService:GetNotesService,
               private relatedTicketsService: RelatedTicketsService,
               private storeNoteService:StoreNoteService,
               private getRepliesService:GetRepliesService,
               private deleteNoteService:DeleteNoteService,
               private modalService: NgbModal,
               private updateNoteService:UpdateNoteService
    ) {
     
    }
    sources;
    sourcesSpinner:boolean = true;
    getTicketSources(){
      this.getSourcesService.getSources().subscribe(data=>{
        this.sources = data["data"];
        this.sourcesSpinner = false;
        // console.log(this.sources)
      });
    }

    types;
    typesSpinner:boolean = true;
    getTicketTypes(){
      this.getTypes.getTicketTypes(localStorage.getItem("token")).subscribe(data=>{
        this.types = data["data"];
        this.typesSpinner = false;
        // console.log(this.types)
      });
    }

    hospitals;
    hospitalsSpinner:boolean = true;
    getTicketHospitals(){
      this.getHospitals.getHospitals(localStorage.getItem("token")).subscribe(data=>{
        this.hospitals = data["data"];
        this.hospitalsSpinner = false;
        // console.log(this.hospitals)
      });
    }

    status;
    statusSpinner:boolean = true;
    getStatues(){
      this.getStatuesService.getStatuses(localStorage.getItem("token")).subscribe(data=>{
        this.status = data["data"];
        this.statusSpinner = false;
        // console.log(this.status)
      });
    }

    priorities;
    prioritiesSpinner:boolean = true;
    getpriorities(){
      this.getPrioritiesService.getPriorities(localStorage.getItem("token")).subscribe(data=>{
        this.priorities = data["data"];
        this.prioritiesSpinner = false;
        // console.log(this.priorities)
      });
    }
    clientidselected:boolean = false;

    pastTicketsObject : {id : string,
      source_id : string,
      ticket_type_id : string,
      hospital_id : string,
      status_id : string,
      priority_id : string,
      client_id: string};

    pastTicketsForm = new FormGroup({
      id : new FormControl('',),
      source_id : new FormControl('',),
      ticket_type_id : new FormControl('',),
      hospital_id : new FormControl('',),
      status_id : new FormControl('',),
      priority_id : new FormControl('',),
      file_number : new FormControl('',)
    });
    pastTickets :any;
    pastTicketFilter(){
        // console.log(this.pastTicketsForm.value);
        this.pastTicketsObject = this.pastTicketsForm.value ;
        const keys = Object.keys(this.pastTicketsObject)
        for(let counter = 0 ; counter <= keys.length ; counter++ ){
          if(this.pastTicketsObject[keys[counter]]==''){
            delete this.pastTicketsObject[keys[counter]]
          }
        }
        this.pastTicketsObject.client_id = this.cliendId;
        
        this.getTicketsService.getTicketsWithParams(this.pastTicketsObject).subscribe(data=>{
          this.pastTickets = data;
         
          
     

          this.pastTicketsLoaded = false;
        },error =>{
          console.log(error)
        });


    }
  page = 1;
  ViewTicketId
  cuurentTicketIdAsParam:any;
  ngOnInit() {
    this.token = localStorage.getItem('token');

   this.cuurentTicketIdAsParam = this.route.snapshot.paramMap.get('id');
    this.getTicketsService.getTicketsWithParams({"id":this.cuurentTicketIdAsParam}).subscribe(data=>{
      this.cliendId = data["data"][0]["client_id"];

      this.pastTicketFilter();
    })

    this.load(this.page, this.keyWord);
    this.ViewTicketId =  this.route.snapshot.paramMap.get('id');
    if(this.ViewTicketId != null){
      this.getnotesBasedOnTicketid();
      this.getrelatedTickets(this.ViewTicketId);
    }
    // this.route.params.subscribe(
    //   (parms: Params) => {
    this.loadReplies();
      // });
    this.getTicketSources();
    this.getTicketTypes();
    this.getTicketHospitals();
    this.getStatues();
    this.getpriorities();
   
    // this.clientIdService.idEmitter.subscribe(id => {
    //   this.cliendId = id;
    //   console.log('iddddd = ' + id);
    //   if(this.cliendId == null || this.cliendId == undefined ){
    //     this.clientidselected = false;
    //   }else{
    //     this.clientidselected = true;
    //     console.log(this.clientidselected);
    //     this.pastTicketFilter()

    //   }
    // })


  }


  getrelatedTickets(ticketId) {
    this.relatedTicketsService.get(this.token, ticketId).subscribe(res => {
      this.mergedTicketsData = res;
    });
  }

  relatedTicketNotes:any;
  loadingNotes:boolean = true;
  getnotesBasedOnTicketid(){
    this.getNotesService.getNotesBasedOnTicket(localStorage.getItem("token"),this.ViewTicketId).subscribe(data =>{
      this.relatedTicketNotes = data["data"];
      // console.log("related tickets =")
      // console.log(this.relatedTicketNotes);
      this.clientidselected = true
      if(this.relatedTicketNotes.length == 0){
        this.noTickets = true
      }
      this.loadingNotes = false
    },error=>{
      // console.log("there is error on related notes");
      // console.log(error);
    });
  }

  onTabChange($event: NgbTabChangeEvent) {
    // console.info('onTabChange=' + $event.activeId);
    // console.info('onTabChange nextId =' + $event.nextId);
    switch($event.nextId) {
      case "followReply": {
        this.loadReplies();
        break;
      }
      case "note": {
        this.loadNotes();
        break;
      }
      case"perviousTicket" :{

        this.pastTicketFilter()
        break;
      }

      default: {

         break;
      }
   }

  }

  Replies:any;
  RepliesSpinner:boolean=true;
  loadReplies(){

    // this.genericCrudService.readAllByTicketNumber<Reply>(Reply,this.ViewTicketId).subscribe(res => {
    //   this.repliesResponse=res;
    //   this.isLoading=false;

    // },e => console.log(e)
    //   );

    this.getRepliesService.getRepliesBasedOnTicketId(this.ViewTicketId).subscribe(data =>{
      this.Replies = data;
      // console.log("replies on next log");
      // console.log(this.Replies);
      this.RepliesSpinner = false;
    })

  }
  notesobject:any;
  noTickets:boolean = false
  loadNotesBasedOnClient(){
    this.noTickets = false;
    this.clientIdService.idEmitter.subscribe(id => {
      this.cliendId = id;
    })
    this.noTickets = false
    console.log("client id from service"+this.cliendId);
    this.getNotesService.getNotes(localStorage.getItem("token"),this.cliendId).subscribe(data =>{
      this.notesobject = data["data"];
      console.log(this.notesobject);
      if(this.notesobject.length == 0){
        this.noTickets = true
      }
    },error=>{
      console.log("there is error on notes");
      console.log(error);
    });
  }

  loadNotes(){

    this.genericCrudService.readAllByTicketNumber<Note>(Note,2).subscribe(res => {
      //console.log(res)
      this.notes=res.data;
      console.log(this.notes);
      
    }
      );


  }
  closeResult: string;
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.updateNoteSpinner = false;
      this.updateNoteLoading = false;
      this.updateNoteDone = false;
    }, (reason) => {
      this.closeResult = `Dismissed`;
      this.updateNoteSpinner = false;
      this.updateNoteLoading = false;
      this.updateNoteDone = false;
    });
  }
  editNote(index:number){
    console.log('edit Note');
    this.note=this.notes[index];

  }
  deleteNote(id){
    console.log(id);
    this.deleteNoteService.deleteNote(localStorage.getItem("token"),id).subscribe(data =>{
      console.log(data);
      this.getnotesBasedOnTicketid();
    });
  }
  updateNoteObject:{}={
    ticket_id : this.route.snapshot.paramMap.get('id'),
    title:"",
    details:""
  }
  updateNoteSpinner:boolean = false;
  updateNoteLoading:boolean = false;
  updateNoteDone:boolean=false;
  updateNote(data,id){
    this.updateNoteSpinner = true;
    this.updateNoteLoading = true;
    this.updateNoteObject["title"] = data.title;
    this.updateNoteObject["details"] = data.details;
    console.log(this.updateNoteObject);
    console.log("note id = "+id);
    this.updateNoteService.updateNote(localStorage.getItem("token"),id,this.updateNoteObject).subscribe(data=>{
      console.log(data);
      this.updateNoteSpinner = false;
      this.updateNoteDone = true;
     
    });

  }

  saveNote(form){
    this.noTickets = false;
    this.note.ticket_id =this.ticketObject.data[0].id;
    //should add user Id for Note
    // this.getnotesBasedOnTicketid()
    console.log(this.note);
    this.storeNoteService.storeNote(localStorage.getItem("token"),this.note).subscribe(data=>{
      console.log(data);
      this.getnotesBasedOnTicketid();
      form.form.reset();
    })

  }
  load(page, keyWord) {

    this._KnowledgeBaseService.getCategories(page, keyWord)
      .subscribe(
        data => this.categoriesData = data,
        erro => console.error(erro)
      );
  }
  search() {
    this.page = 1;
    this.load(this.page, this.keyWord);
  }
  changePage(e){
    this.page = parseInt(e.target.text);
      this.load(this.page,this.keyWord);
    }
}
