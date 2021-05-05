import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-workflow-manegement',
    templateUrl: './workflow-manegement.component.html'
  })

  export class WorkFlowManagementComponent extends AppBaseComponent
   implements OnInit {

    selectedTab = "0";
    constructor(private _activatedRoute: ActivatedRoute,private translate: TranslateService) {
      super(translate);
    }
    ngOnInit(): void {
      this._activatedRoute.queryParams
      .subscribe(params => {
       let from = params.from;
       if(from == 'sla'){
         if(this.isGranted('Display Business Rules')){
          this.selectedTab = 'ngb-tab-1';
         }else{
          this.selectedTab = 'ngb-tab-0';
         }
       }
      });
    }

    onTabChange($event){
      this.selectedTab = $event.nextId;
    }
    preventNavigation($event){
      $event.preventDefault();
    }
}
