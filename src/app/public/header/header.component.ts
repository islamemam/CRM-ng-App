import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';
import { UserManagementService } from 'src/app/shared/services/user-management.service';
import {NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserGroupsService } from 'src/app/shared/services/user-groups.service';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [NgbModalConfig, NgbModal],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent extends AppBaseComponent implements OnInit {
  login:boolean;
  counter = 1;
  usersManagementData: any = { meta: { total: 0 }, data: [] };
  usersGroupData: any;
  token: string;
  page = 1;
  name:string;
  email:string ;
  hospitalsData: any;
  roleIdData: any;
  alerts = [];
  selectedPermissions = [];
  dropdownSettings = {};
  groupPermissions: any;
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
  general:string='';
  chosenSection:string='';
  chosenSectionTitle:string='GENERAL.CHOSE_SEARCH_SECTION';
  userInfo={
    name:""
  }
  appSearch() {
    if(this.general=='' || this.chosenSection==''){
      return;
    }
    let url = `/search-result?general=${this.general}&section=${this.chosenSection}`
    this._router.navigateByUrl(url)
  }
  constructor(private translate: TranslateService, private _router: Router, private _UserManagementService: UserManagementService, private _UserGroupsService: UserGroupsService, config: NgbModalConfig, private modalService: NgbModal, private cdRef: ChangeDetectorRef) {
    super(translate);
        // customize default values of modals used by this component tree
        config.backdrop = 'static';
        config.keyboard = false;    
  }
  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.loadusersManagement(this.page, this.general);
    this.loadusersGroup(this.page);
    this.roleId();
    this.Hospitals();
    this.getGroupPermissions();
  this.userInfo=JSON.parse(localStorage.getItem('userInfo'))
  }
  sectionChange(string){};
  loadusersManagement(page, general) {
    this._UserManagementService.getusersManagement(page, general)
      .subscribe(
        data => this.usersManagementData = data,
        erro => console.log(erro)
      );
  }
  openNewUser(addNewUser) {
    this.modalService.open(addNewUser, { ariaLabelledBy: 'modal-basic-title' })
  }
  openNewBeneficiary(addNewBeneficiary) {
    this.modalService.open(addNewBeneficiary, { ariaLabelledBy: 'modal-basic-title' })
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
          this._router.navigate(['/user-management'])
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
  loadusersGroup(page) {
    this._UserGroupsService.getusersGroup(this.page)
      .subscribe(
        data => this.usersGroupData = data,
        erro => console.log(erro)
      )
  }
  getGroupPermissions() {
    this._UserGroupsService.getusersGroupPermissions()
      .subscribe(
        data => this.groupPermissions = data,
        erro => console.log(erro)
      )
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
  changeUserPage(e) {
    this.page = parseInt(e.target.text);
    this.loadusersManagement(this.page, this.general);
  }
  submit(addUserForm){
  }
  changeLanguage(e) {
    e.preventDefault();
   var lang=localStorage.getItem("lang");
   lang = lang=="ar"?"en":"ar";
   this.translate.setDefaultLang(lang);
   this.translate.use(lang)
    localStorage.setItem("lang",lang);
    window.location.reload();
  }
  logOut($event){
    $event.preventDefault();
    localStorage.removeItem('HollatLogin');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('lang');
    localStorage.removeItem('permissions');
    localStorage.removeItem('hospital');
    this._router.navigateByUrl('/login');
  }

}
