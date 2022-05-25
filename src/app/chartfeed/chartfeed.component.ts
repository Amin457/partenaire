import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { StatFeedRep, StatFeedReponse } from '../models/stat-feed-model';
import { FeedbackService } from '../services/feedback.service';

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

  
   // Pie
   public pieChartOptions: ChartOptions ={
    responsive: true,
  
  }
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public color = ["blue"];
  
  /*

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    
  ];*/

  constructor(private service:FeedbackService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
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
        /*const x = { data: [this.reponse[index].nbr], label: this.reponse[index].reponse }
        this.barChartData.push(x);*/

        this.pieChartLabels.push([this.reponse[index].reponse,]);
        this.pieChartData.push(this.reponse[index].nbr)
        
      }

      
    })
  }

}
