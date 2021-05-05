import { Component, OnInit } from '@angular/core';
import { AppSearchService } from 'src/app/shared/services/app-search.service';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent extends AppBaseComponent  implements OnInit {
  usersManagementData: any = { meta: { total: 0 }, data: [] };
  clientsData: any;
  ticketssData: any;
  page = 1;
  general: string;
  section:string;
  result:[]=[];
  constructor(private translate: TranslateService, private _AppSearchService: AppSearchService, private router: ActivatedRoute) {
    super(translate);
  }

  ngOnInit() {
    this.loadusersManagement(this.page, this.general);
  this.router.queryParams.subscribe(p=>{
    this.general=this.getQueryString('general');
    this.section=this.getQueryString('section');
    if(this.section=='users'){
      //serach in users
    }else if(this.section=='ticket'){
      // search in ticket
    }
    else if(this.section=='beneficaries'){
      // search in beneficaries
    }
    this.loadusersManagement(this.page, this.general);
    this.loadClients(this.general);
    this.loadTickets(this.general);
  })
    
  }
  loadusersManagement(page, general) {
    this._AppSearchService.getusersManagement(page, general)
      .subscribe(
        data => this.usersManagementData = data,
        erro => console.log(erro)
      );
  }
  loadClients(general) {
    this._AppSearchService.getClients(general)
      .subscribe(
        data => this.clientsData = data,
        erro => console.log(erro)
      );
  }
  loadTickets(general) {
    this._AppSearchService.getTickets(general)
      .subscribe(
        data => this.ticketssData = data,
        erro => console.log(erro)
      );
  }
 getQueryString(key){
   var qArr = window.location.search.replace('?','').split('&');
   var value = qArr.find(item=> item.indexOf(key)>=0).split('=')[1];
   return value;
 }
 changeUserPage(e) {
  this.page = parseInt(e.target.text);
  this.loadusersManagement(this.page, this.general);
}
}
