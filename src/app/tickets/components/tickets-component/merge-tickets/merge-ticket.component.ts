import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GetMergeReasons } from 'src/app/shared/services/api/ticketinfo/get-merge-reasons.service';
import { MergeService } from 'src/app/shared/services/api/merge-tickets/merge.service';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'merge-ticket',
  templateUrl: './merge-ticket.component.html',
})
export class MergeTicketsComponent extends AppBaseComponent implements OnInit {

    @ViewChild('mergeTickets', {static: false}) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    ticketsIds = [];
    subTicketsIds = [];
    ticketId = 0;
    openPopup = false;
    selectedItems = [];
    token = '';
    mergeReasonsList = [];
    submitted = false;
    displayDetailError = false;
    displaySelectSubTicketError = false;
    merged = true;
    dropdownSettings = {};

    mergeModel = new FormGroup({
        ticket_id : new FormControl('', Validators.required),
        merge_reason_id : new FormControl('', Validators.required),
        details : new FormControl('', Validators.required),
      });


  constructor(private getMergeReasonsService: GetMergeReasons,
              private mergeService: MergeService,
              private translate: TranslateService) {
    super(translate);
  }


  ngOnInit() {
    this.token = localStorage.getItem('token');
  }


  ismerged(val) {
      this.merged = val;
  }

  setUpMultiSelectSetting(){
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  show(selectedTickets) {

    this.getMergeReasonsService.getAll(this.token).subscribe(res => {
        this.mergeReasonsList = res['data'];
    });

    this.ticketsIds = selectedTickets;
    const ticketId = this.ticketsIds[0];
    this.subTicketsIds = this.ticketsIds.filter(f => f != ticketId);
    this.selectedItems = this.subTicketsIds;
    this.mergeModel.controls['ticket_id'].setValue(this.ticketsIds[0]);
    this.openPopup = true;
    this.modal.show();
  }

  change() {
    const ticketId = this.mergeModel.value['ticket_id'];
    this.subTicketsIds = this.ticketsIds.filter(f => f != ticketId);
    this.selectedItems = this.subTicketsIds;
  }

  onItemSelect(item: any) {
    this.displaySelectSubTicketError = false;
  }
  onSelectAll(items: any) {
    this.displaySelectSubTicketError = false;
  }



  close() {
    this.openPopup = false;
    this.modal.hide();
  }

  detailsChanged(event) {
      this.displayDetailError = false;
  }

  saveMerge() {
    this.submitted = true;
    const saveMergeModel = this.mergeModel.value ;
    saveMergeModel['merged'] = this.merged;
    if (saveMergeModel['details'] == '' ||
     saveMergeModel['details'] == null ||
     saveMergeModel['details'].length < 3) {
      this.displayDetailError = true;
    }
    if (this.selectedItems.length == 0) {
        this.displaySelectSubTicketError = true;
    }
    if (this.mergeModel.status == 'VALID' && !this.displayDetailError
    && !this.displaySelectSubTicketError) {

        saveMergeModel['sub_ticket_ids'] = this.selectedItems;
        this.mergeService.save(this.token, saveMergeModel)
        .subscribe(res => {
            console.log(res);
            this.modalSave.emit(null);
            this.close();
        });
    }
  }

}
