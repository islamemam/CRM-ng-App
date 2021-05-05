import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {nationalidValidators} from'./nationalid.validator'
import { client } from './client';
import { clientService } from './clients.service';
import { NgbdSortableHeader, SortEvent } from './sortable.directive';
import {NgbModal,NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { GetClientsService } from './../../shared/services/api/clients/get-clients.service';
import {ClientsSearchService} from './../../shared/services/api/clients/clients-search.service';
import {GetNationalIdTypesService} from './../../shared/services/api/clients/get-national-id-types.service';
import {GetNationalitiesService} from './../../shared/services/api/clients/get-nationalities.service';
import {GetClientTypesService} from './../../shared/services/api/clients/get-client-types.service';
import {GetHospitalsService} from './../../shared/services/api/clients/get-hospitals.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import {AddClientService} from './../../shared/services/api/clients/add-client.service';
import {ImportClientsService} from './../../shared/services/api/clients/import-clients.service';
import {ImportClientsHospitalsService} from './../../shared/services/api/clients/import-clients-hospitals.service';
import { DownloadTemplatesService } from '../../shared/services/api/download-templates.service';
import { windowWhen } from 'rxjs/operators';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { ExportClientsService } from '../../shared/services/api/clients/export-clients.service';
interface clientsTable {
  id: string;
  national_id: string;
  client_id: string;
  client_type_id: string;
  nationality_id: string;
  national_id_type_id: string;
  name: string;
  email: string;
  mobile: string;
  mobitelephonele: string;
  birthdate: string;
  gender: string;
  address: string;
  ministry_member: string;
  deleted_at:string;
  created_at:string;
  updated_at:string;
  hospitals:[];

}
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  providers: [clientService, DecimalPipe]
})


export class ClientsComponent extends AppBaseComponent {
  clients$: Observable<client[]>;
  total$: Observable<number>;
  clientsFixed:any;
  clientsObject : any ;
  public isCollapsed = false;
  clientsObjectSpinner:boolean = true;
  clientsObjectsize:any;
 
  searchUSerGender:any = "";
 
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;


  constructor(
    public service: clientService,
    private getClientsService:GetClientsService,
    private clientsSearchService :ClientsSearchService,
    private modalService: NgbModal,
    private getNationalIdTypes:GetNationalIdTypesService,
    private getNationalitiesService:GetNationalitiesService,
    private getClientTypesService:GetClientTypesService,
    private getHospitalsService:GetHospitalsService,
    private addClientService:AddClientService,
    private formBuilder: FormBuilder,
    private importClientsService:ImportClientsService,
    private ImportClientsHospitalsService: ImportClientsHospitalsService,
    private downloadTemplatesService:DownloadTemplatesService,
    private translate: TranslateService,
    private exportClientsService:ExportClientsService
    
  ){
    super(translate);
    this.clients$ = service.clients$;
    this.total$ = service.total$;  
  }
 
  searchFormObject:{};
  clientSearchForm = new FormGroup({
    name : new FormControl('',),
    national_id : new FormControl('',nationalidValidators.nationalidformat),
    mobile : new FormControl('',),
    telephone : new FormControl('',[Validators.minLength(8),Validators.maxLength(8)]),
    email : new FormControl('',Validators.email),
    gender :new FormControl('')
  });
  filterdClientResponse;
  searchClient(){
    this.firstClientsGet = false;
    this.filterdClientsGet = true;
    this.searchFormObject = this.clientSearchForm.value;
    let propNames = Object.getOwnPropertyNames(this.searchFormObject);
    for (var i = 0; i < propNames.length; i++) {
      var propName = propNames[i];
      if (this.searchFormObject[propName] == "" || this.searchFormObject[propName] == null) {
        delete this.searchFormObject[propName];
      }
    }
    if(Object.getOwnPropertyNames(this.searchFormObject).length == 0){
      this.clientSearchForm.setErrors({
        emptyform:true
      })
    }
    if(this.clientSearchForm.status == "INVALID"){
    }else if(this.clientSearchForm.status == "VALID"){
      this.clientsSearchService.search(localStorage.getItem("token"),this.searchFormObject,1).subscribe(
        users => {
          this.clientsObject = users["data"];
          console.log(this.clientsObject);
          this.filterdClientResponse = users;
        }
      )
    }

   
  }
  changeFilterdClientPage(event){
    this.clientsSearchService.search(localStorage.getItem("token"),this.searchFormObject,parseInt(event)).subscribe(
      users => {
        this.clientsObject = users["data"];
        this.filterdClientResponse = users;
      }
    )
  }
  //spinner for national id types
  nationalidspinner :boolean = true;
  //national id types object
  nationalidtypes:any;
  getNationalIdTypesHttp(){
    this.getNationalIdTypes.getNationalid(localStorage.getItem("token")).subscribe(data=>{
      this.nationalidtypes = data["data"]
      this.nationalidspinner = false;
    })
  }


  //spinner for national id types
  nationalitiesSpinner :boolean = true;
  //national id types object
  nationalities:any;
  getNationalitiesHttp(){
    this.getNationalitiesService.getNationalities(localStorage.getItem("token")).subscribe(data=>{
      this.nationalities = data["data"]
      this.nationalitiesSpinner = false;
    })
  }

  //spinner for national id types
  clientTypesSpinner :boolean = true;
  //national id types object
  clientTypes:any;
  getClientTypesHttp(){
    this.getClientTypesService.getClientTypes(localStorage.getItem("token")).subscribe(data=>{
      this.clientTypes = data["data"]
      this.clientTypesSpinner = false;
    })
  }

 
  hospitalsSpinner :boolean = true;
  //national id types object
  hospitals:any;
  getHospitals(){
    this.getHospitalsService.getHospitals(localStorage.getItem("token")).subscribe(data => {
      this.hospitals = data["data"]
      this.hospitalsSpinner = false;
    })
  }
  slectedHospitals:any[] = [];
  pivots:any[] = [];
  ngmodelname:string="";
  ngmodelpivotname:string="";
  requestObject: {};

  //alerts
  // namealerts:boolean = false;
  // mobilealerts:boolean = false;
  // nationalidtypealert:boolean = false;
  // nationalidAlert:boolean = false;
  // phoneAlert:boolean = false;
  // nationalitieAlert:boolean = false;
  // addressAlert:boolean =false;
  // emailAlert:boolean =false;
  // ministryMemberAlert:boolean=false;
  // genderAlert:boolean=false;
  // clientTypeAlert:boolean=false;
  // addCustomer(data){

  //   for(let i = 0; i < this.hospitalCounterArray.length ; i++){
  //     this.ngmodelname = "hospital"+i;
  //     this.ngmodelpivotname = "pivot"+i;
      // console.log(data[this.ngmodelname]);
      // this.slectedHospitals.push(data[this.ngmodelname]);
      // this.pivots.push(data[this.ngmodelpivotname]);
    // }
    // console.log(this.slectedHospitals);
    // console.log(this.pivots);
    // for(i=0; [1,2].length; i++){
    //   requestObject["hospitals["1"][hospital_id]"]=k
    // }
// }
  
 
    
  haserror:boolean=false;
  addclienterrormsg:any=""
  addClientForm = new FormGroup({
    name : new FormControl('',Validators.required),
    mobile : new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
    national_id_type_id : new FormControl('',Validators.required),
    national_id : new FormControl('',[Validators.required,nationalidValidators.nationalidformat]),
    telephone : new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
    nationality_id : new FormControl('',Validators.required),
    address : new FormControl('test',Validators.required),
    email : new FormControl('',[Validators.required,Validators.email]),
    ministry_member : new FormControl('',Validators.required),
    gender : new FormControl('',Validators.required),
    birthdate : new FormControl('',),
    client_type_id : new FormControl('',Validators.required),
    client_id : new FormControl(''),
    hospitals : this.formBuilder.array([this.createItem()])
  });
  addClientObject:{};
  formatedClientObject:{};
  addhospital(){
    (this.addClientForm.get('hospitals') as FormArray).push(this.createItem());
  }
  //addclient spinner
  addClientSpinner:boolean = false;
  alreadytaken:boolean = false;
  errormsg:any;
  clientisadded:boolean = false;
  errorarrays:any;
  addClient(){
    this.haserror = false;
    this.alreadytaken = false;
    if(this.addClientForm.status == "INVALID"){
      console.log("invalid");
      console.log( this.addClientForm);
      this.addClientForm.setErrors({
        emptyform:true
      })
    }else if(this.addClientForm.status == "VALID"){
      this.addClientObject = this.addClientForm.value ;
      if((this.addClientForm.get("hospitals").value).toString() != ""){
      for (var i = 0; i < (this.addClientForm.get("hospitals").value).length; i++) {
        if (this.addClientObject["hospitals"][i]["hospital_id"] == "" || this.addClientObject["hospitals"][i]["file_number"] == "") {
           delete this.addClientObject["hospitals"][i];
        }
      }
      }
      if((this.addClientForm.get("hospitals").value).toString() == ""){
        this.formatedClientObject = this.addClientForm.value ;
        delete this.formatedClientObject["hospitals"];
        if(((this.formatedClientObject["birthdate"]["day"])as number) < 10){
          this.formatedClientObject["birthdate"]["day"] = "0" + this.formatedClientObject["birthdate"]["day"]
        }
        this.formatedClientObject["birthdate"] =  this.formatedClientObject["birthdate"]["year"] +"-"+this.formatedMonth+"-"+this.formatedClientObject["birthdate"]["day"];
        // this.formatedClientObject["mobile"] = "966"+ this.formatedClientObject["mobile"];
        // console.log(this.formatedClientObject);
        this.formatedClientObject["mobile"] = "966"+(this.formatedClientObject["mobile"]).toString();

        this.addClientSpinner = true;
        this.addClientService.addClient(localStorage.getItem("token"),this.formatedClientObject).subscribe(res=>{
          // console.log(res)
          this.addClientSpinner = false;
          this.clientisadded = true;

        },err=>{
          this.haserror = true;
          console.log(err)
          this.addClientSpinner = false;
          this.addclienterrormsg = err;
          if(err["status"] == "422"){
            // console.log(err["error"]["errors"])
            this.alreadytaken = true;
            this.errormsg = JSON.stringify((err["error"]["errors"]));
            this.errorarrays = err["error"]["errors"];
          }
        })
      }else{
        this.formatedClientObject = this.addClientForm.value ;
        
        if(((this.formatedClientObject["birthdate"]["day"])as number) < 10 && ((this.formatedClientObject["birthdate"]["day"])).toString().charAt(0) != "0"){
          this.formatedClientObject["birthdate"]["day"] = "0" + this.formatedClientObject["birthdate"]["day"]
        }
        this.formatedClientObject["birthdate"] =  this.formatedClientObject["birthdate"]["year"] +"-"+this.formatedMonth+"-"+this.formatedClientObject["birthdate"]["day"];
        // this.formatedClientObject["mobile"] = "966"+ this.formatedClientObject["mobile"];
        this.formatedClientObject["mobile"] = "966"+(this.formatedClientObject["mobile"]).toString();       
        console.log(this.formatedClientObject);
        this.addClientSpinner = true;
        this.addClientService.addClient(localStorage.getItem("token"),this.formatedClientObject).subscribe(res=>{
          console.log(res)
          this.addClientSpinner = false;
          this.clientisadded = true;
        },err=>{
          console.log(err)
          this.addClientSpinner = false;
          this.haserror = true;
          this.addclienterrormsg = err;
          if(err["status"] == "422"){
            // console.log(err["error"]["errors"])
            this.alreadytaken = true;
            this.errormsg = JSON.stringify((err["error"]["errors"]));
            this.errorarrays = err["error"]["errors"];
            
          }
        })
      }
      
      console.log(this.formatedClientObject);
    }
    

  }
  formatedMonth:string="";
  oldmonth:any;
  requestes:any=[];
  exportObject:any=[];
  objectToExport={};
  getIds:boolean = false;
  exportForm = new FormGroup({
    extension : new FormControl('',Validators.required),
  });
  exportdone:boolean=false;
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
    console.log( this.filterdClientResponse);
    console.log("clicked export");
    this.exportdone=true;
    for(var reqpage = 0 ; reqpage < this.filterdClientResponse.meta.last_page ; reqpage++){
      this.requestes[reqpage] = this.clientsSearchService.search(localStorage.getItem("token"),this.searchFormObject,(reqpage+1))      
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
        this.exportClientsService.export(this.objectToExport).subscribe(response=>{
          this.downloadFile(response, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        });
      }else if(this.exportForm.controls.extension.value == "pdf"){
        this.exportClientsService.export(this.objectToExport).subscribe(response=>{
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
  formatDate(date){
    // if(this.addClientForm["birthdate"] != null && (this.addClientForm["birthdate"]).toString().length == 1){
    //   this.formatedMonth = "0" + this.addClientForm["birthdate"].month ;
    // }else if(this.addClientForm["birthdate"] != null ){
    //   this.formatedMonth = this.addClientForm["birthdate"].month ;
    // }
    // // console.log(this.formatedMonth);
    // console.log(this.formatedMonth);
    // console.log(this.addClientForm.get("birthdate").value)
    this.oldmonth = (this.addClientForm.get("birthdate").value.month).toString()
    if(this.oldmonth.length == 1){
      console.log("need Format");
      this.formatedMonth = "0" + this.oldmonth ;
    }else{
      this.formatedMonth = this.oldmonth ;
    }
    // this.addClientForm.get("birthdate").patchValue("1996-01-16");

    console.log(this.addClientForm.get("birthdate").value)
    console.log(this.formatedMonth)
    
  }
  orderForm: FormGroup;
  items: FormArray;
  fileToUpload: File = null;
  importFiles = new FormGroup({
    importClientsFile : new FormControl('',)
  });
  importHospitalFiles = new FormGroup({
    importhospitalFile : new FormControl('',)
  });
  imprtFile:boolean = false;
  imprtFileDone:boolean = false;
  imprtFileError:boolean = false;
  imprtFileSuccess:boolean = false;
  failures:any[] = [];
  importClients(event){
    console.log(<File>event.target.files[0])
    if(<File>event.target.files[0] != undefined){
      this.imprtFile = true;
      const formData = new FormData();

      this.fileToUpload = <File>event.target.files[0];
      // console.log( this.fileToUpload );
      formData.append('file', this.fileToUpload);
      this.importClientsService.addClient(localStorage.getItem("token"),formData).subscribe(
        res=>{
          
        console.log(res);
        if(res["failures"].length > 0){
          this.imprtFileError = true;
          this.failures = res["failures"];
        }else{
          this.imprtFileSuccess = true;
        }
        this.imprtFileDone = true;
        <File>event.target.files[0] == undefined;
      }, error => {
        console.log(error);
        this.imprtFileError = true;
      }
    
    )
  }

    
  }
  needparent:boolean = false
  parent:String;
  selectParent(customerType){
    console.log(customerType);
    if(customerType == "2" || customerType == "3"){
      console.log("need parent");
      this.needparent = true;
    }else{
      this.needparent = false;
    }
  }
  mainClient :any = {} ;
  mainClientResponse :any ;
  mainClientName:any;
  mainclientspinner:boolean = false;
  hiddenInput = false;
  parentSearch(input){
    this.mainClientName = "";
    let client_id_search = input.target.value;
    if(client_id_search.length == 10){
      console.log("need search");
      this.mainClient.national_id = client_id_search;
      console.log(this.mainClient);
      this.mainclientspinner = true;
      this.clientsSearchService.search(localStorage.getItem("token"),this.mainClient,1).subscribe(
        users => {
          this.mainClientResponse = users["data"];
          this.mainClientName = users["data"][0]["name"];
          this.addClientForm.patchValue({
            client_id : users["data"][0]["id"]
          },) ;
          console.log(this.mainClientResponse);
          this.mainclientspinner = false;
        },error =>{
          this.mainclientspinner = false;
          this.addClientForm.patchValue({
            client_id : ""
          },) ;
          this.mainClientName = "لا يوجد مستفيد برقم الهوية المدخل";
        }
      )
    }
    
  }
  
  importClientsHospitals(event){
    console.log("import hospital");
    console.log(<File>event.target.files[0])
    if(<File>event.target.files[0] != undefined){
      this.imprtFile = true;
      const formData = new FormData();

      this.fileToUpload = <File>event.target.files[0];
      // console.log( this.fileToUpload );
      formData.append('file', this.fileToUpload);
      this.ImportClientsHospitalsService.addClientsHospitals(localStorage.getItem("token"),formData).subscribe(
        res=>{
          
        console.log(res);
        if(res["failures"].length > 0){
          this.imprtFileError = true;
          this.failures = res["failures"];
        }else{
          this.imprtFileSuccess = true;
        }
        this.imprtFileDone = true;
        <File>event.target.files[0] == undefined;
      }, error => {
        console.log(error);
        this.imprtFileError = true;
      }
    
    )
  }
    // if(<File>event.target.files[0] != undefined){
    //   this.imprtFile = true;
    //   const formData = new FormData();
  
    //   this.fileToUpload = <File>event.target.files[0];
    //   console.log( this.fileToUpload )
    //   // console.log( this.fileToUpload );
    //   formData.append('hospital file', this.fileToUpload);
    //   this.ImportClientsHospitalsService.addClientsHospitals(localStorage.getItem("token"),this.fileToUpload).subscribe(
    //     res=>{
    //       this.imprtFileDone = true;
    //     console.log(res);
    //     <File>event.target.files[0] == undefined;
    //     if(res["failures"].length > 0){
    //       this.imprtFileError = true;
    //       this.failures = res["failures"];
    //     }else{
    //       this.imprtFileSuccess = true;
    //     }

    //   }, error => {
    //     console.log(error);
    //     this.imprtFileError = true;
    //     <File>event.target.files[0] == undefined;

    //   }
    
    // )
    // }
    <File>event.target.files[0] == undefined;

  }
  closeimportmodal(){
    this.imprtFile = false;
    this.imprtFileDone = false;
    this.imprtFileError = false;
  }
  removeHospital(i){
    console.log(i);
    (this.addClientForm.get('hospitals') as FormArray).removeAt(i)
  }
  createItem(): FormGroup {
    return this.formBuilder.group({
      hospital_id: '',
      file_number:''
    });
  }
  emptySearchForm(){
    this.clientsObject = this.clientsFixed ;
    this.firstClientsGet = true;
    this.filterdClientsGet = false;
  }
  minDate
  maxDate
  cuurentyear = (new Date()).getFullYear();
  currentMonth =(new Date()).getMonth();
  currentDay = (new Date()).getDay();
  clientsWithInterface:clientsTable[];
  response:any;
  page = 1;
  pageSize = 50;
  collectionSize;
  get countries(): clientsTable[] {
    return this.clientsWithInterface
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  downloadTemplates(){
    console.log("download templates");
    this.downloadTemplatesService.downloadTemplates().subscribe(data=>{
      console.log(data);
      window.open(data["data"][0]["value"]);
      window.open(data["data"][1]["value"]);

    })
  }
  total;
  paginationMaxSize = 10;
  changeClientPage(e){
    console.log(parseInt(e));
    this.getClientsService.getClients(parseInt(e)).subscribe(data =>{
      this.clientsObject = data["data"]; 
    })
  }
  firstClientsGet;
  filterdClientsGet;
  ngOnInit() {
    // this.hospitalCounterArray.push("1");
    this.firstClientsGet = true;
    this.filterdClientsGet = false;
    this.getClientsService.getClients(1).subscribe(data =>
    {
      this.clientsObject = data["data"];
      this.response = data;
      this.page = this.response.meta.current_page;
      this.pageSize = this.response.meta.per_page;
      this.total = this.response.meta.total;
      this.clientsObjectSpinner = false;
      this.clientsObjectsize =   this.clientsObject.length;
      // this.collectionSize = this.clientsObject.length;
      this.clientsFixed = data["data"];
      this.clientsWithInterface = data["data"];
      console.log(this.clientsWithInterface);
      this.collectionSize = this.clientsWithInterface.length;
      
    })
    this.minDate = {year: 1950, month: 1, day: 1};
    this.maxDate = {year: 2020, month: 12, day: 30};
    
   
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
  closeResult: string;
  modalOption: NgbModalOptions = {};
  
  open(content) {
    this.mainClientName = "";
    this.needparent = false;
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.centered = true;
    this.needparent = false;
    this.modalService.open(content, this.modalOption).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.clientisadded = false;
      let cuurentHospital = this.addClientForm.get("hospitals").value;
      this.addClientForm.reset();
      this.addClientForm.get("national_id_type_id").setValue("1");
      this.addClientForm.get("nationality_id").setValue("1");
      this.addClientForm.get("client_type_id").setValue("1");
      this.addClientForm.get("hospitals").setValue(cuurentHospital);



      for (var i = 0; i < (this.addClientForm.get('hospitals') as FormArray).length; i++) {
        if (i>0) {
          (this.addClientForm.get('hospitals') as FormArray).removeAt(i)
        }
      }
      this.alreadytaken = false;
      this.haserror = false;

    }, (reason) => {
      this.closeResult = `Dismissed`;
      this.mainClientName = "";
      this.clientisadded = false;
      this.addClientForm.reset();
      for (var i = 0; i < (this.addClientForm.get('hospitals') as FormArray).length; i++) {
        if (i>0) {
          (this.addClientForm.get('hospitals') as FormArray).removeAt(i)
        }
      }
      this.alreadytaken = false;
      this.haserror = false;
      
    });
    this.getNationalIdTypesHttp();
    this.getNationalitiesHttp();
    this.getClientTypesHttp();
    this.getHospitals();
    
  }
 

}
