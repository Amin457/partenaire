import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['1/2', '2/2', '3/2', '4/2', '5/2', '6/2', '7/2','8/2','9/2','10/2','11/2', '12/2', '13/2', '14/2', '15/2', '16/2', '17/2','18/2','19/2','20/2','21/2', '22/2', '23/2', '24/2', '25/2', '26/2', '27/2','28/2','29/2','30/2'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public chartColors: Array<any> = [
    { // first color
      backgroundColor: '#729bfa',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },
    { // second color
      backgroundColor: '#b1c2fd',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40, 20, 75, 80, 48, 60,65, 59, 80, 81, 56, 55, 40, 20, 75, 80, 48, 60,65, 59, 80, 81, 56, 55, 40, 20, 75, 80, 48, 60], label: 'Réclamations' },
    { data: [28, 48, 40, 19, 86, 27, 90, 50, 40, 86, 46, 20,28, 48, 40, 19, 86, 27, 90, 50, 40, 86, 46, 20,28, 48, 40, 19, 86, 27, 90, 50, 40, 86, 46, 20], label: 'Feedbacks' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
