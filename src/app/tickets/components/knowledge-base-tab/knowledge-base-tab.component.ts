import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/shared/models/api-response.model';
import { Hospital } from 'src/app/shared/models/hospital.model';
import { GenericCrudService } from 'src/app/shared/services/api/generic-crud.service';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-knowledge-base-tab',
  templateUrl: './knowledge-base-tab.component.html',
  styleUrls: ['./knowledge-base-tab.component.scss']
})
export class KnowledgeBaseTabComponent extends AppBaseComponent implements OnInit {
  public hospitalsResponse: ApiResponse<Hospital[]>  =new ApiResponse<Hospital[]>() ;
  public pageSize :number = 5;

  public paginationMaxSize :number = 5;
  public isLoading = true;
  constructor(private  genericCrudService: GenericCrudService, private translate: TranslateService) {
    super(translate);
  }

  

  ngOnInit() {
    this.genericCrudService.readAll<Hospital>(Hospital).subscribe(res => { 
      this.hospitalsResponse=res; 
      this.isLoading=false; 

    },e => console.log(e)
      );

  }

}
