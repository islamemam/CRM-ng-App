import { Component, OnInit } from '@angular/core';
import { WorkFlowService } from 'src/app/shared/services/api/workflow/workflow.service';
import { GetMainReasonsService } from 'src/app/shared/services/api/ticketinfo/get-main-reasons.service';
import { GetSubReasonsService } from 'src/app/shared/services/api/ticketinfo/get-sub-reasons.service';
import { GetPrioritiesService } from 'src/app/shared/services/api/ticketinfo/get-priorities.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetRolesService } from 'src/app/shared/services/api/get-roles.service';
import { GetBrActionsService } from 'src/app/shared/services/api/business-role/get-br-actions.service';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-add-edit-work-flow',
    templateUrl: './add-edit-SLA.component.html'
  })

  export class AddEditSLA extends AppBaseComponent implements OnInit {
    token : string;
    ticketTypesList = [];
    periorityId = 0;
    perioritiesList = [];
    dropdownSettings = {};
    dropdownList = [];
    selectedSubMainOption :any;
    selectedMainOption :any;
    selectedOperator :any;
    responseDuratopnList = [
      {'id':'min', 'value': 'Minutes'},
      {'id':'hrs', 'value': 'Hours'}
    ]
    resolveDurationList = [
      {'id':'min', 'value': 'Minutes'},
      {'id':'hrs', 'value': 'Hours'}
    ]
    selectedResponseDurationModel = null;
    selectedResolveDurationModel = null;
    slaModel = {};
    selectedItems = [];
    slaId = 0;
    submitted = false;
    displayDetailArError = false;
    displayDetailEnError = false;
    displayTicketsTypes = false;
    updated_at = "";
    policyName = "";
    displayChildComponent = false;
    lastOptions = [];
    MainOption = null;
    ticketTypeId = 0;
    mainReasonId = 0;
    subReasonId = 0;
    workFlow : any;
    shouldList = [];
    lastOptionSelected = null;
    selectedLastShouLdSelect = null;
    mainOptionTypeId : MainOptionStatus;
    shouldListId = 0;
    rolesList = [];
    displayRolesDropDownList = false;
    selectedResolveRoles = [];
    selectedRespondRoles = [];
    selectedEscalationResolveRoles = [];
    displayCondetionsError = false;
    mainList = []
    actionList = [];
    statusList = [];
    selectedFirstShouLdSelect = null;
    escalationListToSave = [];
    escalationId = 0;
    escalationResolveType = 'resolve';
    escalationRespondType = 'respond';
    sla_escalationList = [];
    sla_escalationList_Ids = [];
    slaCondetionsList = [];
    mainResolveObject = null;
    mainRespondObject = null;
    displayRespondSelectRolesError = false;
    displayResolveSelectRolesError = false;
    displayDuplicatePriorityError = false;

    constructor( private workFlowService:WorkFlowService,
                  private getMainReasonsService : GetMainReasonsService,
                  private getSubReasonService : GetSubReasonsService,
                  private getPrioritiesService : GetPrioritiesService,
                  private _Activatedroute:ActivatedRoute,
                  private _router: Router,
                  private getRolesService: GetRolesService,
                  private getBrActionsService : GetBrActionsService,
                  private translate: TranslateService
                   ){
      super(translate);
                    if(this._Activatedroute.snapshot.paramMap.get("id") !){
                      this.slaId = +this._Activatedroute.snapshot.paramMap.get("id");
                    }


    }
    ngOnInit(): void {
      this.token = localStorage.getItem('token')
      this.fillChildData();
      this.getPriorities();
      this.getTicketTypes();
      this.getActionsList();
      this.addEscalation();
      this.getSlaCondetions();
      if(this.slaId != 0){
        this.getSlaData(this.slaId);
      }
    }

    createNewEscalationId(){
      this.escalationId =this.escalationId + 1 ;
      return this.escalationId;
    }

    removeProcedure(id){
      this.sla_escalationList_Ids = this.sla_escalationList_Ids
      .filter(d => d != id);
      this.sla_escalationList = this.sla_escalationList
      .filter(d => d.id != id);
    }


    getSlaconditionKeys(){
      this.workFlowService.getSLACondetionsKeys().subscribe(res => {
        this.slaCondetionsList = res['data'];
      });
    }

    esclationItemChanged(event){
      let data = event["value"];
      let r = this.sla_escalationList.find(d => d.id == data.id);
      if(r == null){
        this.sla_escalationList.push(data);
      }else{
        let obj = this.sla_escalationList.findIndex(f => f.id == data.id);
        this.sla_escalationList[obj] = data;
      }
    }

    getActionsList(){
      this.getBrActionsService.getAll().subscribe(res => {
          for (let index = 0; index < res["data"].length; index++) {
            const element = res["data"][index];
            this.actionList.push({item_id: element.id, item_text:element.name_ar})
          }
      })
  }

    fillChildData(){
      this.getRoles();
      this.displayChildComponent = true;
    }


    getSlaCondetions(){
      this.workFlowService.getSLACondetionsKeys().subscribe(res => {
          this.mainList = res["data"];
      });
  }


  // getCondetionsData(){
  //   this.getCondetionsKeysService.getAll().subscribe(res => {
  //     this.mainList = res["data"];
  // });
  // }

    getRoles(){
      this.getRolesService.getAll().subscribe(res => {
        for (let index = 0; index < res["data"].length; index++) {
          const element = res["data"][index];
          this.rolesList.push({item_id: element.id, item_text:element.name})
        }
        this.displayRolesDropDownList = true;
      });
    }

    onSelectRespondAllRoles(items){}
    onRespondRoleSelect(item){}
    onSelectResolveAllRoles(items){}
    onResolveRoleSelect(item){}
    onSelectAllEscalationRoles(items){}
    onEscalationRoleSelect(item){}


    addEscalation(){
      //this.sla_escalationList_Ids.push(0);
      this.sla_escalationList_Ids.push(this.createNewEscalationId());
    }
    getSlaData(id){
      this.displayRolesDropDownList = false;
      this.workFlowService.getSlaDataById(this.token, id).subscribe(res => {
        this.addPloicyModel.controls["priority_id"].setValue(res["priority"].id);
        this.updated_at = res["updated_at"];
        this.policyName = res["title_ar"];
        this.addPloicyModel.controls["title_ar"].setValue(res["title_ar"]);
        this.addPloicyModel.controls["details_ar"].setValue(res["details_ar"]);
        this.addPloicyModel.controls["title_en"].setValue(res["title_en"]);
        this.addPloicyModel.controls["details_en"].setValue(res["details_en"]);
        this.addPloicyModel.controls["priority_id"].setValue(res["priority_id"]);
        this.addPloicyModel.controls["status"].setValue(res["status"]);
        this.addPloicyModel.controls["status"].setValue(res["status"]);
        this.addPloicyModel.controls["response_count"].setValue(res["response_count"]);
        this.addPloicyModel.controls["resolve_count"].setValue(res["resolve_count"]);
        this.addPloicyModel.controls["response_duration"].setValue(res["response_duration"]);
        this.addPloicyModel.controls["resolve_duration"].setValue(res["resolve_duration"]);
        for (let index = 0; index < res["ticket_types"].length; index++) {
          const element = res["ticket_types"][index];
          this.selectedItems.push({item_id:element.id,item_text:element.title_ar})
        }

        let reminderList = res['sla_remainders'];
        let respondReminder = reminderList.find(d => d.type == 'respond');
        if(respondReminder != null){
          this.addPloicyModel.controls["scale_remainder_respond"]
          .setValue(respondReminder.scale_remainder);
          this.addPloicyModel.controls["unit_remainder_respond"]
          .setValue(respondReminder.unit_remainder);
          
          for (let index = 0; index < respondReminder.roles.length; index++) {
            const element = respondReminder.roles[index];
            this.selectedRespondRoles.push(this.rolesList.find(g => g.item_id == element.id));
          }
        }
        let resolveReminder = reminderList.find(d => d.type == 'resolve');
        if(resolveReminder != null){
          this.addPloicyModel.controls["scale_remainder_resolve"]
          .setValue(resolveReminder.scale_remainder);
          this.addPloicyModel.controls["unit_remainder_resolve"]
          .setValue(resolveReminder.unit_remainder);

          for (let index = 0; index < resolveReminder.roles.length; index++) {
            const element = resolveReminder.roles[index];
            this.selectedResolveRoles.push(this.rolesList.find(g => g.item_id == element.id));
          }
        }
        let escalationList = res['sla_escalations'];
        let respondEscalation = escalationList.find(d => d.type == 'respond');
        if(respondEscalation != null){
          this.mainRespondObject = respondEscalation;
        }

        let resolveEscalation = escalationList.find(d => d.type == 'resolve');
        if(resolveEscalation != null){
          this.mainResolveObject = resolveEscalation;
        }
      });

      this.displayRolesDropDownList = true;

    }


    addPloicyModel = new FormGroup({
      title_ar : new FormControl('',Validators.required),
      details_ar : new FormControl(),
      details_en : new FormControl(),
      title_en : new FormControl(),
      priority_id : new FormControl('',Validators.required),
      response_count : new FormControl('',Validators.required),
      response_duration : new FormControl('',Validators.required),
      resolve_duration : new FormControl('',Validators.required),
      resolve_count : new FormControl('',Validators.required),
      status : new FormControl(true),
      scale_remainder_respond : new FormControl('',Validators.required),
      unit_remainder_respond : new FormControl('',Validators.required),
      unit_remainder_resolve : new FormControl('',Validators.required),
      scale_remainder_resolve : new FormControl('',Validators.required)
    });



    setUpMultiSelectSetting(){
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'اختر الكل',
        unSelectAllText: 'الغاء اختيار الكل',
        searchPlaceholderText : 'بحث',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
    }

    deleteSLA($event){
      $event.preventDefault();
      this.workFlowService.deleteSLA(this.token,this.slaId).subscribe(f => {
        this._router.navigateByUrl('/workflow-management');
      });
    }

    onItemSelect(item: any) {
      this.displayTicketsTypes = false;
    }
    onSelectAll(items: any) {
      this.displayTicketsTypes = false;
    }

    // getgetsLaCondetionsKeys(){
    //   this.workFlowService.getsLaCondetionsKeys().subscribe(res => {
    //   })
    // }


    getPriorities(){
      this.getPrioritiesService.getPriorities(this.token).subscribe(res => {
        this.perioritiesList = res["data"];
      });
    }

    getTicketTypes(){
      this.workFlowService.getTicketTypes(this.token).subscribe(res => {

        for (let index = 0; index < res["data"].length; index++) {
          const element = res["data"][index];
          this.ticketTypesList.push({item_id:element.id,item_text:element.title_ar})
        }
      });
      this.setUpMultiSelectSetting();
    }

    detailsArabicChanged(event){
      this.displayDetailArError = false;
    }

    detailsEnglishChanged(event){
      this.displayDetailEnError = false;
    }

    saveSLA(){
      this.submitted = true;
      this.slaModel = this.addPloicyModel.value ;
      if( this.slaModel["details_en"] == "" || this.slaModel["details_en"] == null){
        this.displayDetailEnError = true;
      }

      if( this.slaModel["details_ar"] == "" || this.slaModel["details_ar"] == null){
        this.displayDetailArError = true;
      }

      let selectedTicketTypesIds = [];
      for (let index = 0; index < this.selectedItems.length; index++) {
        const element = this.selectedItems[index];
        selectedTicketTypesIds.push(element.item_id);
      }

      if(selectedTicketTypesIds.length == 0){
        this.displayTicketsTypes = true;
      }

     this.slaModel["ticket_types"] = {
      "ids": selectedTicketTypesIds
    };
    if(this.selectedRespondRoles.length == 0){
      this.displayRespondSelectRolesError = true;
    }else{
      this.displayRespondSelectRolesError = false; 
    }

    if(this.selectedResolveRoles.length == 0){
      this.displayResolveSelectRolesError = true;
    }else{
      this.displayResolveSelectRolesError = false; 
    }

    let sla_remainderList = [];
    let selectedRespondRolesIds = this.selectedRespondRoles.map(x => x.item_id);
    let selectedResolveRolesIds = this.selectedResolveRoles.map(x => x.item_id);
    this.addPloicyModel["value"]["sla_escalation"] = this.sla_escalationList;

    sla_remainderList.push({
      scale_remainder:this.addPloicyModel.value["scale_remainder_respond"],
      unit_remainder:this.addPloicyModel.value["unit_remainder_respond"],
      type: 'respond',
      role_id : selectedRespondRolesIds
    });

    sla_remainderList.push({
      scale_remainder:this.addPloicyModel.value["scale_remainder_resolve"],
      unit_remainder:this.addPloicyModel.value["unit_remainder_resolve"],
      type: 'resolve',
      role_id : selectedResolveRolesIds
    });

    this.slaModel["sla_remainder"] = sla_remainderList;
    let escalationListValid = true;
    for (let index = 0; index < this.sla_escalationList.length; index++) {
      const element = this.sla_escalationList[index];
      if(element.validationStatus == false){
        escalationListValid = false;
      }
    }
      if(this.addPloicyModel.status == "VALID" && !this.displayDetailArError
      && !this.displayDetailEnError && !this.displayTicketsTypes && 
      !this.displayResolveSelectRolesError && !this.displayRespondSelectRolesError
      && escalationListValid){
        if(this.slaId == 0){
          this.workFlowService.saveSLA(this.token, this.slaModel).subscribe(res => {
            //this._router.navigate(['/workflow-management'], { queryParams: { from: 'sla' } });     
            this._router.navigate(['/workflow-management']);       
          }, error => {
            if(error.status == 422)
            {
              let allerrors = error.error.errors
              let errordexcripteveList = Object.keys(allerrors);
              if(errordexcripteveList.find(f => 'priority_id') != null){
                this.displayDuplicatePriorityError = true;
               }else{
                this.displayDuplicatePriorityError = false;
               }

              // if(errordexcripteveList.find(f => 'title_en') != null){
              //   this.displayDuplicationEnglishTitleError = true;
              //  }else{
              //   this.displayDuplicationEnglishTitleError = false;
              //  }
              //  if(errordexcripteveList.find(f => 'title_ar')!= null){
              //   this.displayDuplicationArabicTitleError = true;
              //   }else{
              //       this.displayDuplicationArabicTitleError = false;
              // }

            }
            console.log(error);
          });
        }else{
          this.workFlowService.updateSLA(this.token, this.slaModel, this.slaId).subscribe(res => {
            this._router.navigate(['/workflow-management'], { queryParams: { from: 'sla' } });
            //this._router.navigate(['/workflow-management']);       
          });
        }
      }
    }



    // start next sprint
    onChange1(nvalue){
      this.selectedFirstShouLdSelect = nvalue;
    }



    onSelectLastOption(val){
      this.lastOptionSelected = val;
      if(this.MainOption.id == 2){
        this.ticketTypeId = val.id;
      }else if (this.MainOption.id == 3){
        this.mainReasonId = val.id;
      } else if(this.MainOption.id == 4){
        this.subReasonId = val.id;
      }
    }

    addShouldCondition(){
      this.shouldList.push(
        {'id' : this.createNewIdForShouldList(),
          'mainSelected': this.MainOption.name,
         'lastSelected': this.lastOptionSelected.value,
         'type': this.mainOptionTypeId,
          'value': this.lastOptionSelected.id})
    }

    createNewIdForShouldList(){
      this.shouldListId =this.shouldListId + 1 ;
      return this.shouldListId;
    }

    removeShouldItem(id){
      var deletedIndex = this.shouldList.findIndex(f => f.id == id);
      if(deletedIndex > -1){
        for (let index = 0; index < this.shouldList.length; index++) {
          if(index > 0){
            this.shouldList.splice(index, 1);
          }
        }
        this.shouldList[deletedIndex +1];
        this.shouldList.splice(deletedIndex, 1);
      }
    }

    onMainOptionChange(selectedValue) {
      this.lastOptions = [];
      this.MainOption = selectedValue;
      if(this.MainOption.id == 2){
        this.workFlowService.getTicketTypes(this.token).subscribe(f => {
          for (let index = 0; index < f["data"].length; index++) {
            const element = f["data"][index];
            this.lastOptions.push({'id': element.id, 'value': element.title_ar})
          }
          this.ticketTypeId = this.lastOptions[0].id;
          this.mainOptionTypeId = MainOptionStatus.TicketType;
        });
      }else if (this.MainOption.id == 3){
        this.getMainReasonsService.getMainReasons(this.token,this.ticketTypeId)
        .subscribe(f => {
          for (let index = 0; index < f["data"].length; index++) {
            const element = f["data"][index];
            this.lastOptions.push({'id': element.id, 'value': element.title_ar})
          }
          this.mainReasonId = this.lastOptions[0].id;
          this.mainOptionTypeId = MainOptionStatus.MainReason;
        });
      }else if (this.MainOption.id == 4){
        this.getSubReasonService.getSubReasons(this.token,this.mainReasonId)
        .subscribe(f => {
          for (let index = 0; index < f["data"].length; index++) {
            const element = f["data"][index];
            this.lastOptions.push({'id': element.id, 'value': element.title_ar})
          }
          this.subReasonId = this.lastOptions[0].id;
          this.mainOptionTypeId = MainOptionStatus.SubReason;
        });
      }

  }


  onselected(selectedValue){
  }
  // end next sprint

}


export enum MainOptionStatus
{
  TicketSource = 1,
  TicketType = 2,
  MainReason = 3,
  SubReason =4
}