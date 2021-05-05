import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserManagementService } from 'src/app/shared/services/user-management.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BractionEnum } from 'src/app/shared/models/braction.enum';
import { GetTicketTypesService } from 'src/app/shared/services/api/ticketinfo/get-ticket-types.service';
import { GetPrioritiesService } from 'src/app/shared/services/api/ticketinfo/get-priorities.service';
import { GetMainReasonsService } from 'src/app/shared/services/api/ticketinfo/get-main-reasons.service';
import { GetSubReasonsService } from 'src/app/shared/services/api/ticketinfo/get-sub-reasons.service';
import { BrCondetionKeys } from '../add-edit-buseniss-role/add-edit-buseniss-role.component';

@Component({
    selector: 'proc-section-add-sla',
    templateUrl: './proc-section-add-sla.component.html'
  })

  export class ProcSLAAectionComponent implements OnInit {
    @Input () token;
    @Input () id;
    @Input () userList: []; 
    @Input () actionList: []; 
    @Input () rolesList: []; 
    @Output() procAdded: EventEmitter<any> = new EventEmitter<any>();
    @Input() mainModel: any;
    @Input() mainList: any;
    set_vlaue_local = 0;

    subMainList = [];
    brActionsEnum : BractionEnum;
    selectedRoles = [];
    dropdownSettings = null;
    submitted = false;   
    displayBodyError = false;
    displayActionError = false;
    shouldSelectReciverIds = false;
    displayGeneralError = false;
    addProcModel = new FormGroup({
    body : new FormControl('',Validators.required),
    reciever_type : new FormControl('',Validators.required),
    br_action_id : new FormControl('',Validators.required),
    id : new FormControl(''),
    set_key : new FormControl('',Validators.required),
    set_value : new FormControl('',Validators.required)
    });
    constructor(private userServiceManagement: UserManagementService,
        private getTicketTypesService: GetTicketTypesService,
        private getPrioritiesService : GetPrioritiesService){
    }
    ngOnInit(): void {
        this.setUpMultiSelectSetting();
        this.addProcModel.controls["id"].setValue(this.id);
        if(this.mainModel != null){
            this.setValues();
        }
    }

    setValues(){
        this.addProcModel.controls["br_action_id"].setValue(this.mainModel.br_action_id);
        this.addProcModel.controls["reciever_type"].setValue(this.mainModel.reciever_type);
        this.addProcModel.controls["body"].setValue(this.mainModel.body);
        this.addProcModel.controls["set_key"].setValue(this.mainModel.set_key);
        if(this.mainModel.set_key != null){
            this.onMainChangeOnEdit(this.mainModel.set_value);
        }
        if(this.mainModel.br_action_id == 1){
            for (let index = 0; index < this.mainModel.reciever_ids.length; index++) {
                const element = this.mainModel.reciever_ids[index];
                this.selectedRoles.push(this.rolesList.find(f => f['id'] == element));
            }
        }

        if(this.mainModel.br_action_id == 2){
            this.displayGeneralError = false;
        }
        // this.addProcModel.controls["set_value"].setValue(this.mainModel.set_value);
    }
    
    setUpMultiSelectSetting(){
        this.dropdownSettings = {
          singleSelection: false,
          idField: 'id',
          textField: 'name',
          selectAllText: 'اختر الكل',
          unSelectAllText: 'الغاء تحديد الكل',
          itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }

      setSubMainValue(id){

      }

    onMainChange(event){
        this.subMainList = [];
        let selectedId = this.addProcModel.get('set_key').value;
        if(selectedId == BrCondetionKeys.TicketType){
            this.getTicketTypes();
        }else if(selectedId == BrCondetionKeys.Priority){
            this.getPeriorities();
        }
        // else if(selectedId == BrCondetionKeys.MainReason){
        //     this.getmainResons();
        // }
        // else if(selectedId == BrCondetionKeys.SubReason){
        //     this.getSubResons();
        // }
        this.procedureAdded();
    }

    onMainChangeOnEdit(selectedIdSubmain){
        this.subMainList = [];
        let selectedId = this.addProcModel.get('set_key').value;
        if(selectedId == BrCondetionKeys.TicketType){
            this.getTicketTypes(selectedIdSubmain);
        }else if(selectedId == BrCondetionKeys.Priority){
            this.getPeriorities(selectedIdSubmain);
        }
        // else if(selectedId == BrCondetionKeys.MainReason){
        //     this.getmainResons();
        // }
        // else if(selectedId == BrCondetionKeys.SubReason){
        //     this.getSubResons();
        // }
        this.procedureAdded();
    }

    getTicketTypes(selectedIdSubMain?){
        this.getTicketTypesService.getTicketTypes(this.token).subscribe(res => {
            this.subMainList = res["data"];
            if(selectedIdSubMain != null){
                this.addProcModel.controls["set_value"].setValue(selectedIdSubMain);
                this.procedureAdded();
            }
           

    })
    }

    getPeriorities(selectedIdSubMain?){
        this.getPrioritiesService.getPriorities(this.token)
        .subscribe(res => {
            this.subMainList = res["data"];
            if(selectedIdSubMain != null){
                this.addProcModel.controls["set_value"].setValue(this.mainModel.set_value);
            }
        })
    }

    // getmainResons(){
    //     let ticketType = this.shouldList
    //     .find(f => f.type == BrCondetionKeys.TicketType);
    //     if(ticketType != null){
    //         this.getMainReasonsService.
    //         getMainReasons(this.token, ticketType.subMainId)
    //         .subscribe(res => {
    //             this.subMainList = res["data"];
    //         })
    //     }
    // }

    // getSubResons(){
    //     let mainReson = this.shouldList
    //     .find(f => f.type == BrCondetionKeys.MainReason && f.groupId == this.groupId);
    //     console.log(mainReson, this.shouldList);
    //     if(mainReson != null){
    //         this.getSubReasonService.getSubReasons(this.token,mainReson.subMainId)
    //         .subscribe(res => {
    //             this.subMainList = res["data"];
    //         });
    //     }
    // }

    onSubMainChange(event){
        this.procedureAdded();
    }

    validateInputs(){
        this.submitted = true;
        if(this.selectedRoles.length == 0){
            this.shouldSelectReciverIds = true;
        }else{
            this.shouldSelectReciverIds = false;
        }
        if(this.addProcModel.value["body"]==null || this.addProcModel.value["body"].length == 0){
            this.displayBodyError = true;
        }else{
            this.displayBodyError = false;
        }
        this.displayGeneralError = false;
        if(this.addProcModel.value['br_action_id'] == 1){
           
            if(this.displayActionError 
                            || this.displayBodyError
                            || this.shouldSelectReciverIds){
                                this.displayGeneralError = true;
                            }
        }else{
            if(this.addProcModel.get('set_key').invalid 
            || this.addProcModel.get('set_value').invalid){
                this.displayGeneralError = true;
            }
        }
    }
    
    procedureAdded(){
        this.validateInputs();
        let selectedRolesToSave = [];
        for (let index = 0; index < this.selectedRoles.length; index++) {
            const element = this.selectedRoles[index];
            selectedRolesToSave.push(element.id);
        }
        this.addProcModel.value["reciever_id"] = selectedRolesToSave;
        this.addProcModel.value["validationStatus"] = !this.displayGeneralError;
        this.procAdded.emit(this.addProcModel);
    }

    removeProcedure(id){ }
    onUserChange(val){this.procedureAdded()}
    onActionChange($event){this.procedureAdded()}
    onItemSelect(item){this.procedureAdded()}
    onItemDeSelect(item){this.procedureAdded()}
    onItemsDeSelct(item){this.procedureAdded()}
    onSelectAll(items){this.procedureAdded()}
    bodyChanged(event){this.procedureAdded()}

    getUsers(){
        this.userServiceManagement.getusersManagement(1 , '')
        .subscribe(r => {
            this.userList = r["data"];
        });
    }
  }
