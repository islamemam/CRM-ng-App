import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { AppBaseComponent } from 'src/app/base-omponent/app-base-component';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends AppBaseComponent implements OnInit {
  ticketStatisticsValue: any = {};
  token: string;
  hospitalsData: any = {};
  "closed_ticket_monthly": [];
  "reopened_ticket_yearly": [];
  hospital_id=0;
  public amctChartOptions: ChartOptions = {
    responsive: true,
  };
  public amctChartLabels: Label[] = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيه', 'يوليو','أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  public amctChartType: ChartType = 'bar';
  public amctChartLegend = true;
  public amctChartPlugins = [];
  public amctChartData: ChartDataSets[] = [
    { data: [5, 10, 15, 13, 9, 25, 0], label: 'التذاكر' },
  ];
  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(30, 118, 180, 1)',
    },
  ];
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'التذاكر' },
  ];
  public barChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(0, 155, 134, 1)',
    },
  ];
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ["X", "Y", "Z"];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  filterdticketStatisticsResult: Object;

  constructor(private _DashboardService: DashboardService,private translate: TranslateService) {
    super(translate);
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.ticketsStatistics();
    this.Hospitals();
    
  }
  ticketsStatistics() {
    this._DashboardService.getTicketsStatistics()
      .subscribe(
        data => {
          this.ticketStatisticsValue = data;
          this.pieChartLabels = this.ticketStatisticsValue.ticket_type_statistics.ticket_type_numbers.map(item=>item.title_ar)
          this.pieChartData = this.ticketStatisticsValue.ticket_type_statistics.ticket_type_numbers.map(item=>item.tickets_count)
        },
        erro => console.log(erro)
      )
  }
  filterdTicketsStatistics() {
    this._DashboardService.getFilteredTicketsStatistics(this.hospital_id)
      .subscribe(
        data => {
          this.ticketStatisticsValue = data;
          this.pieChartLabels = this.ticketStatisticsValue.ticket_type_statistics.ticket_type_numbers.map(item=>item.title_ar)
          this.pieChartData = this.ticketStatisticsValue.ticket_type_statistics.ticket_type_numbers.map(item=>item.tickets_count)
        },
        erro => console.log(erro)
      )
  }

  Hospitals() {
    this._DashboardService.getHospitalId()
      .subscribe(
        data => this.hospitalsData = data,
        erro => console.log(erro)
      )
  }
  extractWeeksStatistics(obj) {
    //[{text,value, %}]
    var texts = [" الرابع", "الثالث", "الثاني", "الأول"]
    var values: number[] = Object.values(obj)
    var sum = values.reduce((total, val) => total + val, 0)
    return values.map((val, index) => {
      return {
        text: texts[index],
        value: val,
        percent: val / sum * 100// val/sum(values)*100
      }
    })

  }


}