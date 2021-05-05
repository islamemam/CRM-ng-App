import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
  }
  openAddReportModal(content) {
    this.modalService.open(content, {}).result.then((result) => {

    }, (reason) => {
  
      
    });
  }

}
