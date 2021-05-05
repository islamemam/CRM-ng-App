import { Component } from '@angular/core';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HospitalService } from 'src/app/shared/services/hospital/hospital.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';



@Component({
    selector: 'app-organizations',
    templateUrl: './organizations.component.html'
  })

export class OrganizationComponent extends AppBaseComponent {
    hospitals = [];
    spinnerLoaded = false;
    hospitalObj = null;
    pageSize = 10;
    paginationMaxSize = 10;
    submitted = false;
    displayCodeErrorDuplication = false;
    displayWebsiteErrorDuplication = false;
    hospitalId = 0;

    addHospitalForm = new FormGroup({
        title_ar : new FormControl('', [Validators.required, Validators.minLength(3)]),
        title_en : new FormControl('', [Validators.required, Validators.minLength(3)]),
        address_en : new FormControl('',[Validators.required, Validators.minLength(3)]),
        address_ar : new FormControl('',[Validators.required, Validators.minLength(3)]),
        code : new FormControl('',[Validators.required, Validators.minLength(3)]),
        mobile : new FormControl('',[Validators.required, Validators.pattern('^([0-9]{11})$')]),
        telephone : new FormControl('',[Validators.required, Validators.pattern('^([0-9]{8})$')]),
        hotline : new FormControl('',[Validators.required, Validators.pattern('^([0-9]{1,8})$')]),
        google_map_url : new FormControl('',[Validators.required, Validators.pattern('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$')]),
      });

    constructor(private hospitalService: HospitalService,
                private modalService: NgbModal,
                private translate: TranslateService) {
                  super(translate);
        
    }
    ngOnInit(){
        this.getAll(1);
    }

    onpageChange(pageNumber){
        this.getAll(pageNumber);
    }

    addHospital(){
      this.submitted = true;
      this.spinnerLoaded = true;
      if(this.addHospitalForm.status != "VALID"){
        this.spinnerLoaded = false;
        return;
      }
        let model = this.addHospitalForm.value;
        if(this.hospitalId == 0){
              this.hospitalService.save(model).subscribe(res => {
                this.close();
                this.getAll(1);
            }, error => {
              if(error["status"] == "422"){
                let allerrors = error.error.errors
                let errordexcripteveList = Object.keys(allerrors);
                this.displayErrors(errordexcripteveList);
              }
            });
        }else{
          this.hospitalService.update(this.hospitalId, model).subscribe(res => {
            this.close();
            this.getAll(1);
          }, error => {
            if(error["status"] == "422"){
              let allerrors = error.error.errors
              let errordexcripteveList = Object.keys(allerrors);
              this.displayErrors(errordexcripteveList);
            }
          });
        }

    }

    displayErrors(errordexcripteveList: any[]){
      this.spinnerLoaded = false;
      if(errordexcripteveList.find(f => f == 'google_map_url') != null){
        this.displayWebsiteErrorDuplication = true;
      }else{
        this.displayWebsiteErrorDuplication = false;
      }
      if(errordexcripteveList.find(f => f == 'code') != null){
        this.displayCodeErrorDuplication = true;
      }else{
        this.displayCodeErrorDuplication = false;
      }
    }

    clearData(){
      this.hospitalId = 0;
      this.spinnerLoaded = false;
      this.addHospitalForm.reset();
    }

    getbyId(id, content){
      this.spinnerLoaded = false;
      this.hospitalService.getbyId(id).subscribe(res => {
        this.addHospitalForm.controls["title_ar"].setValue(res["title_ar"]);
        this.addHospitalForm.controls["title_en"].setValue(res["title_en"]);
        this.addHospitalForm.controls["address_ar"].setValue(res["address_ar"]);
        this.addHospitalForm.controls["address_en"].setValue(res["address_en"]);
        this.addHospitalForm.controls["code"].setValue(res["code"]);
        this.addHospitalForm.controls["mobile"].setValue(res["mobile"]);
        this.addHospitalForm.controls["telephone"].setValue(res["telephone"]);
        this.addHospitalForm.controls["hotline"].setValue(res["hotline"]);
        this.addHospitalForm.controls["google_map_url"].setValue(res["google_map_url"]);
        this.hospitalId = id;
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
       
          }, (reason) => {
    
          });
      });
    }

    close(){
      this.hospitalId = 0;
      this.modalService.dismissAll();
    }

    openDeleteConfirmation(content, id, $event){
        $event.preventDefault();
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
                if(result == 'Save'){
                  this.delete(id);
                }
              }, (reason) => {
            });
    }

    openAddEdit(content) {
      this.clearData();
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

        }, (reason) => {
  
        });
      }

    getAll(pageNumber){
        this.hospitalService.getAll(pageNumber).subscribe(res => {
            this.hospitalObj = res;
        })
      }

      delete(id){
          this.hospitalService.delete(id).subscribe(res => {
            this.getAll(1);
          });
      }
}