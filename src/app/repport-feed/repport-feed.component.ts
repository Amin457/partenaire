import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { StatFeed, StatFeedQuestion, StatFeedReponse } from '../models/stat-feed-model';
import { Partenaire } from '../models/partenaire_model';
import jwt_decode  from 'jwt-decode';
import { FeedbackService } from '../services/feedback.service';
import { Feedback } from '../models/feedback-model';

@Component({
  selector: 'app-repport-feed',
  templateUrl: './repport-feed.component.html',
  styleUrls: ['./repport-feed.component.css']
})
export class RepportFeedComponent implements OnInit {
  nbrFeed=0;
  myDate = new Date();
  dateDebut1: any=this.date();
  dateFin1: any= new DatePipe('en-US').transform(this.myDate, 'yyyy-MM-dd');

  dateDebut!: any;
  dateFin!: any;
  
  obj: StatFeed = new StatFeed;
  question: StatFeedQuestion[]=[];
  reponse: StatFeedReponse[]=[];

  //token
  partenaire!:Partenaire
  token !: any
  decoded: any;
  feedback: Feedback[]=[];
  //////line chart
  lineChartData: ChartDataSets[] = [
    { data: [], label: 'statistiques des Feedbacks' },
  ];

  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(0,0,255,0.3)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

 
  constructor( private service:FeedbackService) {
   
   }

  ngOnInit(): void {
  this.token=localStorage.getItem('token');
  this.decoded = jwt_decode(this.token);
  this.partenaire=this.decoded.result;  
  this.service.Getfeedback(this.partenaire.id_part).subscribe(res => { console.log('res',res.data);
    this.feedback = res.data } ) 

    this.onGenerate();   
  }

  onGenerate(){
    this.nbrFeed=0;
    this.lineChartLabels=[];
    this.lineChartData[0].data=[];
    this.dateDebut = new DatePipe('en-US').transform(this.dateDebut1, 'yyyy-MM-dd');
    this.dateFin = new DatePipe('en-US').transform(this.dateFin1, 'yyyy-MM-dd');
    this.obj.dateDebut = this.dateDebut;
    this.obj.dateFin = this.dateFin;
    this.obj.id_part= this.partenaire.id_part;
    this.service.StatFeedQuestion(this.obj).subscribe(res=>{
      this.question=res.question;
      console.log(res)
      this.reponse=res.reponse;
    }
      );

      this.service.getNbFeedParMoix(this.obj).subscribe(res=>{
        console.log(res,"resresres")
        for (var index in res.data) {
          this.lineChartLabels.push(res.data[index].month+" "+res.data[index].year);
          this.lineChartData[0].data?.push(res.data[index].nbrTotal);
          this.nbrFeed=this.nbrFeed+res.data[index].nbrTotal;      
          
         }
      }
        );
    


  }
  date() {
    let date: Date = new Date();
    date.setDate(date.getDate() -730);
    let datePipe: DatePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }
}
