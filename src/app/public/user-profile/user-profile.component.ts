import { Component, OnInit } from '@angular/core';
import { UserManagementService } from 'src/app/shared/services/user-management.service';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent extends AppBaseComponent implements OnInit {
  email:string ;
  hospitalsData: any;
  roleIdData: any;
  page = 1;
  usersManagementData: any = { meta: { total: 0 }, data: [] };
  general = "";
  alerts = [];
  userModel = {
    id: 0,
    name: '',
    email: '',
    department_id: 0,
    national_id: '',
    hospital_id: 0,
    mobile: "",
    roles:0,
    avatar:""
  };
  changePassWordModel ={
    password:"",
    password_confirmation: ""
  }
  userId: any;
  close(alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
  userInfo: any;
  
  constructor(private translate: TranslateService, private _UserManagementService: UserManagementService) { 
    super(translate);
  }
  ngOnInit() {
    this.roleId();
    this.Hospitals();
    this.userInfo=JSON.parse(localStorage.getItem('userInfo'))
    this.loadusersInfo(this.userInfo.id);
    this.sectionChange(this.userInfo.department_id);
  }
  sectionChange(department_id){
    this.userModel.department_id= department_id;
    if(department_id==2){
      (<HTMLInputElement>document.getElementById('r_dep')).checked = true;
      (<HTMLInputElement>document.getElementById('h_dep')).checked = false;
    }else{
      (<HTMLInputElement>document.getElementById('r_dep')).checked = false;
      (<HTMLInputElement>document.getElementById('h_dep')).checked = true
    }
  };
  loadusersInfo(userId) {
    this._UserManagementService.showUserInfo(userId)
      .subscribe(
        data => {
         this.userModel = {
           id: data['id'],
           name: data['name'],
           email: data['email'],
           avatar: data['avatar'],
           department_id: data['department.id'],
           national_id: data['national_id'],
           hospital_id: data['hospitals'].length <= 0? 0 : data['hospitals'][0].id,
           mobile: data['mobile'],
           roles: data['roles'].length <= 0? 0 : data['roles'][0].id,
         }

         
        },
        erro => console.log(erro)
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
        data => {
          this.roleIdData = data
        },
        erro => console.log(erro)
      )
  }
  saveProfile() {
    var model2save = { } //declare variable for hold needed data to save
    this.userModel.department_id = this.userModel.hospital_id > 0 ? 1 : 2;
    if (this.userModel.hospital_id <= 0) {
      model2save ={
        id: this.userModel.id,
        name: this.userModel.name,
        email: this.userModel.email,
        department_id: this.userModel.department_id,
        national_id: this.userModel.national_id,
        mobile: this.userModel.mobile,
        avatar: this.userModel.avatar,
        role_id: this.userModel.roles
      }
    }else{
      model2save ={
        id: this.userModel.id,
        name: this.userModel.name,
        email: this.userModel.email,
        department_id: this.userModel.department_id,
        national_id: this.userModel.national_id,
        hospital_id: this.userModel.hospital_id,
        mobile: this.userModel.mobile,
        avatar: this.userModel.avatar,
        role_id: this.userModel.roles
      }
    }
    this._UserManagementService.updateUserManagement(this.userInfo.id,model2save)// send new variable to service instead of this.userModel
      .subscribe(
        () => {
          this.loadusersInfo(this.userInfo.id);
          this.alerts.push({
            type: "success",
            message: "تم تعديل البيانات بنجاح"
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
  updateUserManagement() {
    this._UserManagementService.updateUserManagement(this.userModel,"")
      .subscribe(
        data => this.loadusersInfo(this.userModel),
        erro => console.log(erro)
      )
  }
  saveNewPassWord(){
    this._UserManagementService.changeUserPassWord(this.userInfo.id,this.changePassWordModel)
    .subscribe(
      data => {
        this.alerts.push({
          type:"success",
          message: "تم تعديل كلمة المرور بنجاح"
        })        
      },
      erro => console.error(erro)
    );
  }
}
