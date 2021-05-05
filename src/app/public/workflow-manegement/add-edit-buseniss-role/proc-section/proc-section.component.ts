import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserManagementService } from 'src/app/shared/services/user-management.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BractionEnum } from 'src/app/shared/models/braction.enum';
import { BrCondetionKeys } from '../add-edit-buseniss-role.component';
import { GetTicketTypesService } from 'src/app/shared/services/api/ticketinfo/get-ticket-types.service';
import { GetPrioritiesService } from 'src/app/shared/services/api/ticketinfo/get-priorities.service';
import { GetMainReasonsService } from 'src/app/shared/services/api/ticketinfo/get-main-reasons.service';
import { GetSubReasonsService } from 'src/app/shared/services/api/ticketinfo/get-sub-reasons.service';

@Component({
    selector: 'proc-section-add-br',
    templateUrl: './proc-section.component.html'
  })

  export class ProcSectionComponent implements OnInit {
    displayUserList = false;
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
    subject : new FormControl('',Validators.required),
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
        this.addProcModel.controls["reciever_type"].setValue(this.mainModel.reciever_type);
        this.addProcModel.controls["body"].setValue(this.mainModel.body);
        this.addProcModel.controls["subject"].setValue(this.mainModel.subject);
        if(this.mainModel.reciever_type == 'user'){
            this.onReciverTypeChange('user');

            if(this.mainModel.reciever_ids.length > 0)
            {
                for (let index = 0; index < this.mainModel.reciever_ids.length; index++) {
                    const element = this.mainModel.reciever_ids[index];
                    let selectedItem = this.rolesList.find(d => d['id'] == element);
                    this.selectedRoles.push({'id': selectedItem['id'], 'name': selectedItem['name']});
                }
            }
        }
        if(this.mainModel.br_action_id == 4){
            this.addProcModel.controls["set_key"].setValue(this.mainModel.set_key);
            this.onMainChangeOnEdit(this.mainModel.set_value);
            this.displayGeneralError = false;
        }
        this.addProcModel.controls["br_action_id"].setValue(this.mainModel.br_action_id);
        this.procedureAdded();
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
    onReciverTypeChange(val){
        if(val == 'user'){
            this.getUsers();
            this.displayUserList = true;
            this.shouldSelectReciverIds = true;
        }else{
            this.displayUserList = false;
            this.shouldSelectReciverIds = false;
        }
        this.procedureAdded();
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
        if(this.selectedRoles.length == 0 && this.displayUserList == true){
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
        if(this.addProcModel.value['br_action_id'] != 4){
           
            if(this.displayActionError 
                            || this.displayBodyError 
                            || (this.addProcModel.value['br_action_id'] != 2 == true ? false :
                             this.addProcModel.get('subject').invalid 
                               )
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
        if(this.addProcModel.value["br_action_id"] != 4){
            delete this.addProcModel.value["set_key"];
            delete this.addProcModel.value["set_value"];
        }else{
            delete this.addProcModel.value["reciever_id"];
            delete this.addProcModel.value["reciever_type"];
        }
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
    subjectChanged(event){this.procedureAdded()}

    getUsers(){
        this.userServiceManagement.getusersManagement(1 , '')
        .subscribe(r => {
            this.userList = r["data"];
        });
    }
  }
