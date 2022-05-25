import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { StatFeed, StatFeedQuestion, StatFeedReponse } from '../models/stat-feed-model';
import { Partenaire } from '../models/partenaire_model';
import jwt_decode  from 'jwt-decode';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-repport-feed',
  templateUrl: './repport-feed.component.html',
  styleUrls: ['./repport-feed.component.css']
})
export class RepportFeedComponent implements OnInit {

  dateDebut1!: string;
  dateFin1!: string;

  dateDebut!: any;
  dateFin!: any;
  
  obj: StatFeed = new StatFeed;
  question: StatFeedQuestion[]=[];
  reponse: StatFeedReponse[]=[];

  //token
  partenaire!:Partenaire
  token !: any
  decoded: any;

  

 
  constructor( private service:FeedbackService) {
   
   }

  ngOnInit(): void {
    this.token=localStorage.getItem('token');
  this.decoded = jwt_decode(this.token);
  this.partenaire=this.decoded.result;
  console.log(this.partenaire);
   
    
  }

  onGenerate(){
    this.dateDebut = new DatePipe('en-US').transform(this.dateDebut1, 'yyyy-MM-dd');
    this.dateFin = new DatePipe('en-US').transform(this.dateFin1, 'yyyy-MM-dd');
    this.obj.dateDebut = this.dateDebut;
    this.obj.dateFin = this.dateFin;
    this.obj.id_part= this.partenaire.id_part;

    console.log(this.obj);
    this.service.StatFeedQuestion(this.obj).subscribe(res=>{
      this.question=res.question;
      console.log(res)
      this.reponse=res.reponse;
      
  
      
    
      
      }
      );


    


  }

}
