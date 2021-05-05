import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetBusenissRoleService } from 'src/app/shared/services/api/business-role/get-buseniss-role.service';
import { DeleteBrActionsService } from 'src/app/shared/services/api/business-role/delete-br-service';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-buseniss-role-manegement',
    templateUrl: './buseniss-role-manegement.component.html'
  })
  
  export class BusenissRoleManegement extends AppBaseComponent implements OnInit {
      businessRolesList = [];
      brData: any;
      pageSize = 10;
      paginationMaxSize = 10;
      dataLoded = false;
    ngOnInit(): void {
        this.getBr(1);
    }


    constructor(private getBusenissRoleService: GetBusenissRoleService,
                private modalService: NgbModal,
                private deleteBrActionsService: DeleteBrActionsService,
                private translate: TranslateService){
      super(translate);
    }

    openDeleteBRConfirmationMessage(content, id, $event) {
        $event.preventDefault();
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          if(result == 'Save'){
            this.deleteBR(id);
          }
        }, (reason) => {
  
        });
      }

      deleteBR(id){
        this.deleteBrActionsService.delete(id).subscribe(f => {
          this.getBr(1);
        });
      }
  


    displayDataFun( id){
        let item = this.businessRolesList.find(f => f.id == id);
        if(item != null){
          item.displayData = !item.displayData;
        }
      }

      onpageChange($event){
          this.getBr($event);
      }

    getBr(page_number){
        this.getBusenissRoleService.getAll(page_number).subscribe(res => {
            this.brData = res;
            this.dataLoded = true;
            this.businessRolesList = res["data"];
            for (let index = 0; index < this.businessRolesList.length; index++) {
                const element = this.businessRolesList[index];
                element.displayData = false;
              }
        });
    }
  }