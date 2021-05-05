import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LocalStorageManger } from 'src/app/shared/local-storage-helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username:String;
  password:String;
  userData:Object;
  currentOrigin:String;
  loginError:boolean;
  loginLoading:boolean;
  endpoint: string = environment.baseURL;
  constructor(private httpClient:HttpClient,private router:Router) {
   }

  ngOnInit() {
  }
  onClickSubmit(data){
    this.username = data.emailid ;
    this.password = data.password ;
    this.currentOrigin = "";
    this.loginLoading = true;
    this.loginError = false;
   
    this.httpClient.post(this.endpoint+"/auth/login",
      {
        "email":  this.username,
        "password":  this.password
      })
      .subscribe(
      data  => {
        this.loginLoading = false;
         localStorage.setItem('HollatLogin','true');
         localStorage.setItem('token',data['token']);
         localStorage.setItem('userType',data['roles'][0]['pivot'].model_type);
         localStorage.setItem('userInfo',JSON.stringify(data['user']));
        new LocalStorageManger().setPermissions(data['permissions']);
        if(data['hospitals'].length != 0){
          new LocalStorageManger().setHospital(data['hospitals'][0]);
        }
        return this.router.navigateByUrl('/', {skipLocationChange: false}).then(()=>
        this.router.navigate(['/'])
      );

      },
      error  => {
      this.loginLoading = false;
      this.loginError = true;
      }

    );
  }

}
