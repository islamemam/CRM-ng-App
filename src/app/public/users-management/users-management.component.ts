import { Component, OnInit } from '@angular/core';
import { UserManagementService } from 'src/app/shared/services/user-management.service';
import { UserGroupsService } from 'src/app/shared/services/user-groups.service';
import {NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class UsersManagementComponent extends AppBaseComponent implements OnInit {
  usersManagementData: any = { meta: { total: 0 }, data: [] };
  usersGroupData: any;
  page = 1;
  email:string ;
  hospitalsData: any;
  roleIdData: any;
  general = "";
  alerts = [];
  selectedPermissions = [];
  dropdownSettings = {};
  groupPermissions: any;
  id: any;
  sectionChange(string){};
  close(alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
  userModel = {
    id: 0,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    department_id: 0,
    national_id: '',
    hospital_id: 0,
    role_id: 0,
    mobile: ""
  };
  userGroupModel = {
    id: 0,
    name: '',
    name_ar: '',
    permission_ids: []
  };
constructor(private translate: TranslateService, private _UserManagementService: UserManagementService, private _UserGroupsService: UserGroupsService, config: NgbModalConfig, private modalService: NgbModal) {
    super(translate);
        // customize default values of modals used by this component tree
        config.backdrop = 'static';
        config.keyboard = false;    
  }
  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.loadusersManagement(this.page, this.general);
    this.loadusersGroup(this.page);
    this.roleId();
    this.Hospitals();
    this.getGroupPermissions();
  }
  loadusersManagement(page, general) {
    this._UserManagementService.getusersManagement(page, general)
      .subscribe(
        data => {
          let lang = this.translate.getDefaultLang();// ar, en
          this.usersManagementData = data
        },
        erro => console.log(erro)
      );
  }
  openNewUser(addNewUser) {
    this.modalService.open(addNewUser, { ariaLabelledBy: 'modal-basic-title' })
  }
  search() {
    this.page = 1;
    this.loadusersManagement(this.page, this.general)
  }
  saveNewUser() {
    var model2save = { } //declare variable for hold needed data to save
    this.userModel.department_id = this.userModel.hospital_id > 0 ? 1 : 2;
    if (this.userModel.hospital_id <= 0) {
      model2save ={
        id: 0,
        name: this.userModel.name,
        email: this.userModel.email,
        password: this.userModel.password,
        password_confirmation: this.userModel.password_confirmation,
        department_id: this.userModel.department_id,
        national_id: this.userModel.national_id,
        role_id: this.userModel.role_id,
        mobile: this.userModel.mobile
      }
    }else{
      model2save ={
        id: 0,
        name: this.userModel.name,
        email: this.userModel.email,
        password: this.userModel.password,
        password_confirmation: this.userModel.password_confirmation,
        department_id: this.userModel.department_id,
        national_id: this.userModel.national_id,
        hospital_id: this.userModel.hospital_id,
        role_id: this.userModel.role_id,
        mobile: this.userModel.mobile
      }
    }
    this._UserManagementService.adduserManagement(model2save)// send new variable to service instead of this.userModel
      .subscribe(
        () => {
          this.loadusersManagement(this.page, "");
          this.userModel = {
            id: 0,
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            department_id: 0,
            national_id: '',
            hospital_id: 0,
            role_id: 0,
            mobile: ""
          };
          this.alerts.push({
            type: "success",
            message: "تم الحفظ بنجاح"
          })
        },
        err => {
          var errors = Object.values(err.error.errors).map(item => item[0]);
          this.alerts = errors.map(e => {
            return {
              message: e,
              type: 'error'
            }
          })
          console.log(err);
        }
      );
  }
  confirmDelete(newUser) {
    this.userModel = newUser;
    var yes = confirm("are you sure?");
    if (yes) {
      this.destroyUser()
    }
  }
  destroyUser() {
    this._UserManagementService.deleteUser(this.userModel)
      .subscribe(
        () => {
          this.loadusersManagement(1, "");
        },
        err => console.log(err)
      )
  }
  editUser(newUser, addNewUser) {
    this.userModel = newUser;
    this.openNewUser(addNewUser);
  }
  updateUserManagement() {
    this._UserManagementService.updateUserManagement(this.id,this.userModel)
      .subscribe(
        data => this.loadusersManagement(1, ""),
        erro => console.log(erro)
      )
  }
  Hospitals() {
    this._UserManagementService.getHospitalId()
      .subscribe(
        data => this.hospitalsData = data,
        erro => console.log(erro)
      )
  }
  roleId() {
    this._UserManagementService.getRoleId()
      .subscribe(
        data => this.roleIdData = data,
        erro => console.log(erro)
      )
  }
  changeUserPage(e) {
    this.page = parseInt(e.target.text);
    this.loadusersManagement(this.page, this.general);
  }
  submit(addUserForm){
  }

  // USER GROUPS

  loadusersGroup(page) {
    this._UserGroupsService.getusersGroup(this.page)
      .subscribe(
        data => this.usersGroupData = data,
        erro => console.log(erro)
      )
  }
  openNewUserGroup(addNewUserGroup) {
    this.modalService.open(addNewUserGroup, { ariaLabelledBy: 'modal-basic-title' });
  }
  saveNewUserGroup() {
    // for(let i=0;i<this.selectedPermissions.length;i++){
    //   this.userGroupModel.permission_ids.push(this.selectedPermissions[i].id)
    // }
    this.userGroupModel.permission_ids = this.selectedPermissions.map(item => item.id);
    this._UserGroupsService.addUserGroup(this.userGroupModel)
      .subscribe(
        data => {
          this.userGroupModel = {
            id: 0,
            name: '',
            name_ar: '',
            permission_ids: []
          };
          this.loadusersGroup(this.page);
          this.alerts.push({
            type:"success",
            message:"تم الحفظ بنجاح"
          })  
        },
        erro => console.error(erro)
      )
  }
  getGroupPermissions() {
    this._UserGroupsService.getusersGroupPermissions()
      .subscribe(
        data => this.groupPermissions = data,
        erro => console.log(erro)
      )
  }
  changeUserGroupPage(e) {
    this.page = parseInt(e.target.text);
    this.loadusersGroup(this.page);
  }
  closeClearUser(newUserModal){
    newUserModal.dismiss('Cross click');
    this.userModel = {
      id: 0,
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      department_id: 0,
      national_id: '',
      hospital_id: 0,
      role_id: 0,
      mobile: ""
        };
  }
  closeClearUserGroup(newUserGroupModal){
    newUserGroupModal.dismiss('Cross click')
    this.userGroupModel = {
      id: 0,
      name: '',
      name_ar: '',
      permission_ids: []
  };
  }
}
