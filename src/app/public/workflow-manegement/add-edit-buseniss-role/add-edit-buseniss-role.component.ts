import { Component, OnInit } from '@angular/core';
import { GetMainReasonsService } from 'src/app/shared/services/api/ticketinfo/get-main-reasons.service';
import { GetSubReasonsService } from 'src/app/shared/services/api/ticketinfo/get-sub-reasons.service';
import { GetPrioritiesService } from 'src/app/shared/services/api/ticketinfo/get-priorities.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetCondetionsKeysService } from 'src/app/shared/services/api/business-role/get-br-condetions.service';
import { GetTagsService } from 'src/app/shared/services/api/ticketinfo/get-tags.service';
import { GetTicketTypesService } from 'src/app/shared/services/api/ticketinfo/get-ticket-types.service';
import { GetBrActionsService } from 'src/app/shared/services/api/business-role/get-br-actions.service';
import { SaveBRService } from 'src/app/shared/services/api/business-role/save-br.service';
import { GetBusenissRoleService } from 'src/app/shared/services/api/business-role/get-buseniss-role.service';
import { UpdateBRService } from 'src/app/shared/services/api/business-role/update-br.service';
import { GetRolesService } from 'src/app/shared/services/api/get-roles.service';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-add-edit-buseniss-role',
    templateUrl: './add-edit-buseniss-role.component.html'
  })

  export class AddEditBusenissRole extends AppBaseComponent implements OnInit {
    submitted = false;
    displayDetailArError = false;
    displayDetailEnError = false;
    displayCondetionsError = false;
    displayBodyError = false;
    mainId = 0;
    token = localStorage.getItem('token');
    mainList = [];
    tagsList = [];
    subMainList = [];
    shouldList = [];
    shouldObjectId = 0;
    selectedMainOption :any;
    selectedSubMainOption :any;
    selectedOperator :any;
    actionList = [];
    type : any;
    ticketTypeId = 1;
    userList = [];
    rolesList = [];
    selectedActions=[];
    proceduresList = [];
    proceduresListIds = [];
    procedureId = 0;
    groupId = 0;
    conditionable_type = '';
    conditionable_id = 1;
    operatorList = [{id : '=', value:'='},
                    {id : '>', value:'>'},
                    {id : '<', value:'<'}]
    dropdownSettings: any;
    updated_at = '';
    displayDuplicationArabicTitleError = false;
    displayDuplicationEnglishTitleError = false;
    brId = 0;
    displayMultiSelect = false;
    displayUserList = false;
      constructor(private getCondetionsKeysService: GetCondetionsKeysService,
                    private getTagsService: GetTagsService,
                    private getTicketTypesService: GetTicketTypesService,
                    private getMainReasonsService : GetMainReasonsService,
                    private getSubReasonService : GetSubReasonsService,
                    private getPrioritiesService : GetPrioritiesService,
                    private getBrActionsService : GetBrActionsService,
                    private saveBRService: SaveBRService,
                    private _Activatedroute:ActivatedRoute,
                    private getBrService: GetBusenissRoleService,
                    private updateBrService: UpdateBRService,
                    private getRolesService: GetRolesService,
                    private _router: Router,
                    private translate: TranslateService
        ){
          super(translate);
            if(this._Activatedroute.snapshot.paramMap.get("id") !){
                this.brId = +this._Activatedroute.snapshot.paramMap.get("id");
              }
      }

      setUpMultiSelectSetting(){
        this.dropdownSettings = {
          singleSelection: false,
          idField: 'id',
          textField: 'name_ar',
          selectAllText: 'اختر الكل',
          unSelectAllText: 'الغاء تحديد الكل',
          itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }

    ngOnInit(): void {
        this.getbrRoles();
        this.getTags();
        this.getActionsList();
        this.setUpMultiSelectSetting();
        if(this.brId == 0){
            this.addProcedure();
        }
        this.getRoles();
        if(this.brId != 0){
           this.getBrData(this.brId);
        }else{
            this.displayMultiSelect = true;
        }
    }

    getRoles(){
        this.getRolesService.getAll().subscribe(res => {
            this.rolesList = res["data"];
        });
      }

      onProcedureAdded(event){
        let data = event["value"];
        let r = this.proceduresList.find(d => d.id == data.id);
        if(r == null){
          this.proceduresList.push(data);
        }else{
          let obj = this.proceduresList.findIndex(f => f.id == data.id);
          this.proceduresList[obj] = data;
        }
      }

    createNewEscalationId(){
        this.procedureId =this.procedureId + 1 ;
        return this.procedureId;
      }

    removeProcedure(id){
        this.proceduresListIds = this.proceduresListIds.filter(f => f != id);
        this.proceduresList = this.proceduresList.filter(f => f.id != id);
    }

    addProcedure(){
        let newId = this.createNewEscalationId();
        this.proceduresListIds.push(newId);
        this.proceduresList.push({id:newId});
    }

    getBrData(id){
        this.getBrService.getById(id).subscribe(res => {
            this.fillBrData(res);
        })
    }

    fillBrData(res){
        this.updated_at = res["updated_at"];
        this.addBusinessModel.controls["title_ar"].setValue(res["title_ar"]);
        this.addBusinessModel.controls["details_ar"].setValue(res["details_ar"]);
        this.addBusinessModel.controls["title_en"].setValue(res["title_en"]);
        this.addBusinessModel.controls["details_en"].setValue(res["details_en"]);
        let brCondetions = res["brconditions"];
        for (let index = 0; index < brCondetions.length; index++) {
            const element = brCondetions[index];
            let brType = BrCondetionKeys.TicketType;
            let conditionable_type = '';
            if(element.br_condition_key_id == BrCondetionKeys.TicketType){
                brType = BrCondetionKeys.TicketType;
                conditionable_type = 'App\\Models\\TicketType';
            }else if (element.br_condition_key_id == BrCondetionKeys.Priority)
            {
                brType = BrCondetionKeys.Priority;
                conditionable_type = 'App\\Models\\Priority';
            }else if (element.br_condition_key_id == BrCondetionKeys.MainReason)
            {
                brType = BrCondetionKeys.MainReason;
                conditionable_type = 'App\\Models\\MainReason';
            }else if (element.br_condition_key_id == BrCondetionKeys.SubReason)
            {
                brType = BrCondetionKeys.MainReason;
                conditionable_type = 'App\\Models\\SubReason';
            }
            this.addShouldCondetionToDraw(
               element.br_condition_key.key_title_ar,
               element.br_condition_key.id,
               element.conditionable.title_ar,
               element.operator,
               element.conditionable.id,
               brType,
               conditionable_type,
               element.conditionable.id
            ); 
        }
        for (let index = 0; index < res.br_actions.length; index++) {
            const element = res.br_actions[index];
             this.addProcedure();
             let newId = this.procedureId;
             let mainObject = this.proceduresList.find(d =>d.id == newId);
             
            if(mainObject !=null ){
                mainObject.br_action_id = element.id;
                mainObject.reciever_type = element.pivot.reciever_type;
                mainObject.subject = element.pivot.subject;
                mainObject.body = element.pivot.body;
                mainObject.set_value = element.pivot.setvaluable_id;
                mainObject.set_key = element.pivot.set_key;
                mainObject.reciever_ids = element.br_action_business_rules[0]
                .br_action_business_rule_recievers.map(x => x.recievable_id);
            }
        }

    }

    getProcedureData(id){
        return this.proceduresList.find(f => f.id == id);
    }

    addShouldCondetionToDraw(mainName, mainId, subMainName, operatorName, subMainId, type, conditionable_type, conditionable_id){
        this.shouldList.push(
            {'id' : this.createNewIdForShouldList(),
            'mainName': mainName,
            'mainId': mainId,
            'subMainName': subMainName,
            'operatorName': operatorName,
            'subMainId': subMainId,
            'type': type,
            'conditionable_type': conditionable_type,
            'conditionable_id': conditionable_id,
            'groupId': this.groupId})
    }

    addShouldCondition(){
        this.displayCondetionsError = false;
        if(this.type == BrCondetionKeys.TicketType){
            this.createNewGroupId();
        }
        this.shouldList.push(
          {'id' : this.createNewIdForShouldList(),
            'mainName': this.selectedMainOption.key_title_ar,
            'mainId': this.selectedMainOption.id,
           'subMainName': this.selectedSubMainOption.title_ar,
           'operatorName': this.selectedOperator,
           'subMainId': this.selectedSubMainOption.id,
            'type': this.type,
            'conditionable_type': this.conditionable_type,
            'conditionable_id': this.conditionable_id,
            'groupId': this.groupId})
    }

    createNewGroupId(){
        this.groupId =this.groupId + 1 ;
        return this.groupId;
      }

    createNewIdForShouldList(){
        this.shouldObjectId =this.shouldObjectId + 1 ;
        return this.shouldObjectId;
      }

    onOperatorChange(val){
    }

    onEnTitleChange(event){
        this.displayDuplicationEnglishTitleError = false;
    }

    onArTitleChange(event){
        this.displayDuplicationArabicTitleError = false;
    }

    detailsArabicChanged(event){
        this.displayDetailArError = false;
    }

    bodyChanged(event){
        this.displayBodyError = false;
    }

    detailsEnglishChanged(event){
        this.displayDetailEnError = false;
    }

    addMainBR(){
        this.addShouldCondition();
    }
    onSubMainOptionChange(value){
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

    removeShouldItem(id){
        var deletedIndex = this.shouldList.findIndex(f => f.id == id);
        var deletedObject = this.shouldList.find(f => f.id == id);
        if(deletedIndex > -1){
         if(deletedObject.type == BrCondetionKeys.TicketType){
             this.shouldList = this.shouldList.filter(f => f.groupId != deletedObject.groupId);
         }else if(deletedObject.type == BrCondetionKeys.MainReason){
            let mainReasonIndex = this.shouldList
            .findIndex(f => f.groupId == deletedObject.groupId && f.type == BrCondetionKeys.MainReason);
            if(mainReasonIndex > -1){
                this.shouldList.splice(mainReasonIndex, 1);
            }

             let subReasonIndex = this.shouldList
             .findIndex(f => f.groupId == deletedObject.groupId && f.type == BrCondetionKeys.SubReason);
             if(subReasonIndex > -1){
                 this.shouldList.splice(subReasonIndex, 1);
             }
         }else{
            this.shouldList.splice(deletedIndex, 1);
         }
        }
      }

    onMainSubChange(id){
    }

    getActionsList(){
        this.getBrActionsService.getAll().subscribe(res => {
            this.actionList = res["data"];
        })
    }

    getTicketTypes(){
        this.getTicketTypesService.getTicketTypes(this.token).subscribe(res => {
            this.subMainList = res["data"];
        })
    }

    getmainResons(){
        let ticketType = this.shouldList
        .find(f => f.type == BrCondetionKeys.TicketType && f.groupId == this.groupId);
        if(ticketType != null){
            this.getMainReasonsService.
            getMainReasons(this.token, ticketType.subMainId)
            .subscribe(res => {
                this.subMainList = res["data"];
            })
        }
    }

    getPeriorities(){
        this.getPrioritiesService.getPriorities(this.token)
        .subscribe(res => {
            this.subMainList = res["data"];
        })
    }

    getSubResons(){
        let mainReson = this.shouldList
        .find(f => f.type == BrCondetionKeys.MainReason && f.groupId == this.groupId);
        if(mainReson != null){
            this.getSubReasonService.getSubReasons(this.token,mainReson.subMainId)
            .subscribe(res => {
                this.subMainList = res["data"];
            });
        }
    }

    getbrRoles(){
        this.getCondetionsKeysService.getAll().subscribe(res => {
            this.mainList = res["data"];
        });
    }

    getTags(){
        this.getTagsService.getTags(this.token).subscribe(res => {
            this.tagsList = res["data"];
        });
    }

    addBusinessModel = new FormGroup({
        title_ar : new FormControl('',Validators.required),
        details_ar : new FormControl('',Validators.required),
        details_en : new FormControl('',Validators.required),
        title_en : new FormControl('',Validators.required),
      });


    save(){
        this.submitted = true;
        let postModel = this.addBusinessModel.value ;
        if( postModel["details_en"] == ""
        || postModel["details_en"] == null ||
        postModel["details_en"].length < 3  ){
            this.displayDetailEnError = true;
        }

        if( postModel["details_ar"] == "" ||
        postModel["details_ar"] == null ||
        postModel["details_en"].length < 3 ){
            this.displayDetailArError = true;
        }

        if( postModel["body"] == "" ||
        postModel["body"] == null ||
        postModel["body"].length < 3 ){
            this.displayBodyError = true;
        }
        if(this.shouldList.length == 0){
            this.displayCondetionsError = true;
        }
        if(this.addBusinessModel.status == "INVALID"){
            return;
        }
        let procedurListValidate = true;
        for (let index = 0; index < this.proceduresList.length; index++) {
            const element = this.proceduresList[index];
            if(element.validationStatus == false){
                procedurListValidate = false;
            }
        }
        if(procedurListValidate == false || this.displayDetailArError || this.displayDetailEnError){
            return;
        }
        postModel.br_condition =[];
        for (let index = 0; index < this.shouldList.length; index++) {
            const element = this.shouldList[index];
            postModel.br_condition.push(
                {'br_condition_key_id': element.mainId,
                'conditionable_id':this.conditionable_id,
                'value': element.subMainId,
                'operator': element.operatorName,
                'conditionable_type': element.conditionable_type})
        }
        postModel['br_action'] = this.proceduresList;

        postModel['mainId'] = null;
        postModel['mainSubId'] = null;
        postModel['mainoperatorId'] = null;
        postModel['type']='trigger';
        if(this.brId == 0){
            this.saveBRService.save(postModel)
            .subscribe(res => {
                if(res != null){
                    this._router.navigateByUrl('/workflow-management');
                }
            },error => {
                if(error.status == 200){
                    this._router.navigateByUrl('/workflow-management');
                }
                if(error.status == 422){
                    let allerrors = error.error.errors
                   let errordexcripteveList = Object.keys(allerrors);
                   if(errordexcripteveList.find(f => 'title_en') != null){
                    this.displayDuplicationEnglishTitleError = true;
                   }else{
                    this.displayDuplicationEnglishTitleError = false;
                   }
                   if(errordexcripteveList.find(f => 'title_ar')!= null){
                    this.displayDuplicationArabicTitleError = true;
                    }else{
                        this.displayDuplicationArabicTitleError = false;
                    }
                }
            });
        }else{
            this.updateBrService.update(postModel,this.brId)
            .subscribe(res => {
                if(res!= null){
                    this._router.navigateByUrl('/workflow-management');
                }            },error => {
                if(error.status == 200){
                    this._router.navigateByUrl('/workflow-management');
                }
                if(error.status == 422){
                    let allerrors = error.error.errors
                   let errordexcripteveList = Object.keys(allerrors);
                   if(errordexcripteveList.find(f => 'title_en') != null){
                    this.displayDuplicationEnglishTitleError = true;
                   }else{
                    this.displayDuplicationEnglishTitleError = false;
                   }
                   if(errordexcripteveList.find(f => 'title_ar')!= null){
                    this.displayDuplicationArabicTitleError = true;
                    }else{
                        this.displayDuplicationArabicTitleError = false;
                    }
                }
            });
        }

    }

  }


  export enum BrCondetionKeys
{
  TicketType = 1,
  Priority = 2,
  MainReason = 3,
  SubReason =4
}
