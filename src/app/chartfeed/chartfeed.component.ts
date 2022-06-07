import { Component, Input, OnInit } from '@angular/core';
import { StatFeedRep, StatFeedReponse } from '../models/stat-feed-model';
import { FeedbackService } from '../services/feedback.service';
import { ChartDataSets, ChartOptions, ChartType, RadialChartOptions } from 'chart.js';
import { Color, Label,MultiDataSet} from 'ng2-charts';

@Component({
  selector: 'app-chartfeed',
  templateUrl: './chartfeed.component.html',
  styleUrls: ['./chartfeed.component.css']
})
export class ChartfeedComponent implements OnInit {

  @Input()
  dateDebut!:any;
  @Input()
  dateFin!:any;
  @Input()
  id_question!:any;
  @Input()
  id_part!:number;

  reponse:StatFeedReponse[]=[];
  obj1:StatFeedRep = new StatFeedRep();
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
    
  };
  public chartColors: Array<any> = [
    { // first color
      backgroundColor: '#729bfa',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }];
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'nombre de reponse' }
  ];

  public radarChartType: ChartType = 'radar';
  constructor(private service:FeedbackService) {
   
   }

  ngOnInit(): void {
    this.obj1.dateDebut=this.dateDebut;
    this.obj1.dateFin=this.dateFin;
    this.obj1.id_part=this.id_part;
    this.obj1.id_question=this.id_question;
    this.service.StatFeed(this.obj1).subscribe(res=>{
      this.reponse=res.chart;
      console.log(this.reponse);

      
      for (var index in this.reponse) {
    
       this.barChartLabels[index] = this.reponse[index].reponse;
        this.barChartData[0].data?.push(this.reponse[index].nbr);

      }

      
    })
  }

}
