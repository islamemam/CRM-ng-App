import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WorkFlowService } from 'src/app/shared/services/api/workflow/workflow.service';
import { MainOptionStatus } from '../add-edit-SLA/add-edit-SLA.component';
import { GetMainReasonsService } from 'src/app/shared/services/api/ticketinfo/get-main-reasons.service';
import { GetSubReasonsService } from 'src/app/shared/services/api/ticketinfo/get-sub-reasons.service';
import { BrCondetionKeys } from '../add-edit-buseniss-role/add-edit-buseniss-role.component';
import { GetTicketTypesService } from 'src/app/shared/services/api/ticketinfo/get-ticket-types.service';
import { GetPrioritiesService } from 'src/app/shared/services/api/ticketinfo/get-priorities.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserManagementService } from 'src/app/shared/services/user-management.service';

@Component({
    selector: 'reusable-escalation',
    templateUrl: './reusable-escalation-component.html'
  })

  export class ResuableEscalationComponent implements OnInit {
    displayRolesDropDownList = false;
    @Output() escalationAdded: EventEmitter<any> = new EventEmitter<any>();

    @Input () rolesList: []; 
    @Input () resolveDurationList: []; 
    @Input () mainList: [];  
    @Input () actionList: [];
    @Input () id; 
    @Input () token; 
    @Input () escalationType; 
    @Input () mainObject; 
    selectedRoles = [];
    dropdownSettings = {};
    lastOptions = [];
    MainOption = null;
    ticketTypeId = 0;
    mainReasonId = 0;
    subReasonId = 0;
    mainOptionTypeId : MainOptionStatus;
    selectedMainOption: any;
    selectedOperator :any;
    selectedSubMainOption :any;
    subMainList = [];
    type : any;
    operatorName = '';
    selectedActions=[];
    operatorList = [{id : '=', value:'='},
    {id : '>', value:'>'},
    {id : '<', value:'<'}]
    shouldList = [];
    lastOptionSelected: any;
    lastTicketTypeIdSelected = 0;
    shouldListId = 0;
    escalationModel : any;    
    userList = [];
    actionListToSend = [];
    roleListToSend = [];
    proceduresList = [];
    procedureId = 0;
    proceduresListIds = [];
    conditionable_type = '';
    

    addEscalationModel = new FormGroup({
        scale_escalation : new FormControl('',Validators.required),
        unit_escalation : new FormControl('',Validators.required),
      });
  

    constructor(private getMainReasonsService : GetMainReasonsService,
        private getTicketTypesService: GetTicketTypesService,
        private getPrioritiesService : GetPrioritiesService,
        private getSubReasonService : GetSubReasonsService,
        private userServiceManagement: UserManagementService) {
     
    }

    ngOnInit(): void {
        this.getActionsList();
        for (let index = 0; index < this.rolesList.length; index++) {
          const element = this.rolesList[index];
          this.roleListToSend.push({id:element['item_id'],name:element['item_text'] });
        }

        if(this.mainObject != null){
          this.addEscalationModel.controls["scale_escalation"]
          .setValue(this.mainObject["scale_escalation"]);
          this.addEscalationModel.controls["unit_escalation"]
          .setValue(this.mainObject["unit_escalation"]);
          for (let index = 0; index < this.mainObject.sla_escalation_actions.length; index++) {
            const element = this.mainObject.sla_escalation_actions[index];
            this.addProcedure();
            let newId = this.procedureId;
            let mainObject = this.proceduresList.find(d =>d.id == newId);
            if(mainObject !=null ){
                mainObject.br_action_id = element.id;
                mainObject.reciever_type = element.pivot.reciever_type;
                mainObject.subject = element.pivot.subject;
                mainObject.body = element.pivot.body;
                mainObject.set_key = element.pivot.set_key;
                mainObject.set_value = element.pivot.setvaluable_id;
                mainObject.reciever_ids = element.sla_escalation_sla_escalation_action[0]
                .sla_escalation_sla_escalation_action_recievers
                .map(d => d.recievable_id);
            }
        }
        this.selectedMainOption = {};
        this.selectedSubMainOption = {};
        for (let index = 0; index < this.mainObject.sla_conditions.length; index++) {
          const element = this.mainObject.sla_conditions[index];
          this.selectedMainOption.id = element.condition_key_id;
          this.selectedMainOption.key_title_ar = element.sla_condition_key.key_title_ar;
          this.selectedOperator = element.operator;
          this.selectedSubMainOption.title_ar = element.conditionable.title_ar;
          this.selectedSubMainOption.id = element.conditionable.id;
          this.onMainOptionChange(this.selectedMainOption.id);
          this.addShouldCondition();
        }
        }else{
          this.addProcedure();
        }
        this.displayRolesDropDownList = true;
        this.setUpMultiSelectSetting();
    }

    addShouldCondition(){
      this.shouldList.push(
        {'id' : this.createNewIdForShouldList(),
          'mainName': this.selectedMainOption.key_title_ar,
          'mainId': this.selectedMainOption.id,
         'subMainName': this.selectedSubMainOption.title_ar,
         'operatorName': this.selectedOperator,
         'conditionable_id': this.selectedSubMainOption.id,
         'conditionable_type': this.conditionable_type,
          'type': this.type})
  }
    
    getActionsList(){
      this.actionListToSend.push({id:1,name_ar:'إرسال تنبيه' });
      this.actionListToSend.push({id:2,name_ar:'تحديد قيمه' });
    }

    getUsers(){
      this.userServiceManagement.getusersManagement(1,'')
      .subscribe(r => {
          this.userList = r["data"];
      });
  }

    onProcedureAdded(event){
      let data = event['value'];
      data.sla_action_id = data.br_action_id;
        let r = this.proceduresList.find(d => d.id == data.id);
        if(r == null){
          this.proceduresList.push(data);
        }else{
          let obj = this.proceduresList.findIndex(f => f.id == data.id);
          this.proceduresList[obj] = data;
        }
        this.changeEscalation();
      }

      getProcedureData(id){
        return this.proceduresList.find(f => f.id == id);
    }

    addProcedure(){
      let newId = this.createNewEscalationId();
      this.proceduresListIds.push(newId);
      this.proceduresList.push({id:newId});
    }

    createNewEscalationId(){
      this.procedureId =this.procedureId + 1 ;
      return this.procedureId;
    }

    removeProcedure(id){
      this.proceduresListIds = this.proceduresListIds.filter(f => f != id);
      this.proceduresList = this.proceduresList.filter(f => f.id != id);
  }

    changeEscalation(){ 
        let escalationList = [];
        let selectedActions = [];
        let selectedRoles = [];
        for (let index = 0; index < this.shouldList.length; index++) {
            const element = this.shouldList[index];
            escalationList.push({
                condition_key_id:element.mainId,
                operator:element.operatorName,
                conditionable_id:element.conditionable_id,
                conditionable_type:element.conditionable_type
            });
        }
        for (let index = 0; index < this.selectedActions.length; index++) {
            const element = this.selectedActions[index];
            selectedActions.push(element.item_id);
        }
        for (let index = 0; index < this.selectedRoles.length; index++) {
            const element = this.selectedRoles[index];
            selectedRoles.push(element.item_id);
        }
        this.addEscalationModel.value["sla_condition"] = escalationList;
        this.addEscalationModel.value["escalate_action_id"] = selectedActions;
        this.addEscalationModel.value["role_id"] = selectedRoles;
        this.addEscalationModel.value["type"] = this.escalationType;
         this.addEscalationModel.value["id"] = this.id;
         this.addEscalationModel.value['sla_action'] = this.proceduresList;
         let procValidationList = true;
         for (let index = 0; index < this.proceduresList.length; index++) {
           const element = this.proceduresList[index];
           if(element.validationStatus == false){
            procValidationList = false;
            break;
           }
         }

         this.addEscalationModel.value['validationStatus'] = 
         procValidationList && (this.addEscalationModel.status == "VALID")
         && (this.shouldList.length > 0);
        this.escalationAdded.emit(this.addEscalationModel);
      } 

    onOperatorChange(val){
      this.operatorName = val;
  }

  onSelectAction(item){}
  OnSelectAllActions(items){}
  onSubMainOptionChange(value){
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
    setUpMultiSelectSetting(){
        this.dropdownSettings = {
          singleSelection: false,
          idField: 'item_id',
          textField: 'item_text',
          selectAllText: 'اختر الكل',
          unSelectAllText: 'إاغاء اختيار الكل',
          itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }

      onMainOptionChange(id){
        this.subMainList = [];
        if(this.selectedMainOption.id == BrCondetionKeys.TicketType){
            this.type = BrCondetionKeys.TicketType;
            this.conditionable_type = 'App\\Models\\TicketType';
            this.getTicketTypes();
        }else if(this.selectedMainOption.id == BrCondetionKeys.Priority){
            this.type = BrCondetionKeys.Priority;
            this.conditionable_type = 'App\\Models\\Priority';
            this.getPeriorities();
        }
        else if(this.selectedMainOption.id == BrCondetionKeys.MainReason){
            this.type = BrCondetionKeys.MainReason;
            this.conditionable_type = 'App\\Models\\MainReason';
            this.getmainResons();
        }
        else if(this.selectedMainOption.id == BrCondetionKeys.SubReason){
            this.type = BrCondetionKeys.SubReason;
            this.conditionable_type = 'App\\Models\\SubReason';
            this.getSubResons();
        }
    }

      OnSelectAll(items){ this.changeEscalation();}
      onSelect(item){ this.changeEscalation();}
      OnDeSelectAction(item){ this.changeEscalation();}
      OnDeSelectAllAction(items){ this.changeEscalation();}
      OnSelectAllRoles(items){ this.changeEscalation();}
      onSelectRole(item){ this.changeEscalation();}
      OnDeSelectRole(item){ this.changeEscalation();}
      OnDeSelectAllRoles(items){ this.changeEscalation();}

      getTicketTypes(){
        this.getTicketTypesService.getTicketTypes(this.token).subscribe(res => {
            this.subMainList = res["data"];
        });
    }

    getmainResons(){
        let lastTicketType = this.shouldList.reverse().find(r => r.type == BrCondetionKeys.TicketType);
        if(lastTicketType != null){
            this.getMainReasonsService.
            getMainReasons(this.token, lastTicketType.conditionable_id)
            .subscribe(res => {
                this.subMainList = res["data"];
            })
        }
    }

    addMainBR(){
        this.addShouldCondition();
      
        this.changeEscalation();
    }
    
    getPeriorities(){
        this.getPrioritiesService.getPriorities(this.token)
        .subscribe(res => {
            this.subMainList = res["data"];
        })
    }

    getSubResons(){
      let lastMainReson = this.shouldList.reverse().find(r => r.type == BrCondetionKeys.MainReason);
        if(lastMainReson != null){
            this.getSubReasonService.getSubReasons(this.token,lastMainReson.conditionable_id)
            .subscribe(res => {
                this.subMainList = res["data"];
            });
        }
    }

  }