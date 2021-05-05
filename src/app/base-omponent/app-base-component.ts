import { Component, OnInit } from '@angular/core';
import { LocalStorageManger } from '../shared/local-storage-helper';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-base-component',
  templateUrl: 'app-base-component.html',
})

export class AppBaseComponent implements OnInit {
  localStorageManger = new LocalStorageManger();
  constructor(translate: TranslateService) {
    var lang = localStorage.getItem('lang') || "ar";
    translate.setDefaultLang(lang);
    translate.use(lang);
  }
  ngOnInit() {
    // let lang = localStorage.getItem('lang');
    // if (lang == "en") {
    //   document.querySelector('head').append('');
    // }
  }


  isGranted(permissionName) {
    let permissionList = this.localStorageManger.getPermissions();
    if (permissionList == undefined) {
      this.RemoveLogedInData();
      return false;
    }
    if (permissionList.find(f => f.name == permissionName) == null) {
      return false;
    }
    return true;
  }



  RemoveLogedInData() {
    localStorage.removeItem('HollatLogin');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('lang');
    localStorage.removeItem('permissions');
  }
}
