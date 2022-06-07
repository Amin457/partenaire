import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Datestat } from '../models/date-model';
import { StatRecService } from '../services/stat-rec.service';
import { DatePipe, formatDate } from '@angular/common';
import jwt_decode  from 'jwt-decode';
import { Partenaire } from '../models/partenaire_model';
import { PromotionService } from '../services/promotion.service';
import { Promo } from '../models/promotion-model';
import { environment } from 'src/environments/environment';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {
  images:string[] = [];
  ApiImg = environment.Api + "api/files/get/"

 




  promotions: Promo[] = [];
  accueil!:number;
  prix!:number;
  qualite!:number;
  personnel!:number;

  partenaire!:Partenaire
  token !: any
  decoded: any;

  obj: Datestat = new Datestat();
  //current date
  myDate = new Date();
  dateFin = new DatePipe('en-US').transform(this.myDate, 'yyyy-MM-dd');
  //date -7
  dateDebut!: any;
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  //////linechart
  lineChartData: ChartDataSets[] = [
    { data: [10,9,5,1], label: 'statistiques des carte' },
  ];
  lineChartLabels: Label[] = ['f','f','r','f'];

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

  /////barchart
  public barChartLabels: Label[] = [];
  public barChartLabels1: Label[] = [];

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
    }];

    public chartColors1: Array<any> = [
      { // second color
        backgroundColor: '#b1c2fd',
        borderColor: 'rgba(225,10,24,0.2)',
        pointBackgroundColor: 'rgba(225,10,24,0.2)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(225,10,24,0.2)'
      }];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Réclamations' },
  ];
  public barChartData1: ChartDataSets[] = [
    { data: [], label: 'Feedback' },
  ];

  constructor(private service: StatRecService,private feedbackService: FeedbackService) {
  }

  async ngOnInit(): Promise<void> {
    console.log("dateFin", this.dateFin);
    console.log('datedebut', this.date());

    this.token=localStorage.getItem('token');
    this.decoded = jwt_decode(this.token);
    this.partenaire=this.decoded.result;
    console.log(this.partenaire);

    this.obj.id_part=this.partenaire.id_part;
    this.obj.dateDebut=this.date();
    this.obj.dateFin=this.dateFin;

    await this.service.Getreclamation(this.obj).subscribe(res => {
      console.log('resAccueil', res);
      this.accueil = res.data[0].rec_accueil;
      console.log(this.accueil);

      //reclamations par prix
      this.service.GetRecPrix(this.obj).subscribe(res => {
        console.log('resPrix', res);
        this.prix = res.data[0].rec_accueil;
        console.log(this.prix);

        //reclamations par qualité
        this.service.GetRecQualité(this.obj).subscribe(res => {
          console.log('resQualite', res);
          this.qualite = res.data[0].rec_accueil;
          console.log(this.qualite);

          //reclamations par personnel
          this.service.GetRecPersonnel(this.obj).subscribe(res => {
            console.log('resPersonnel', res);
            this.personnel = res.data[0].rec_accueil;
            console.log(this.personnel);
          })
        })
      })
    });

this.service.statSemaineRec(this.obj).subscribe(res => {
  console.log('hhhhhhhhhhhhhhhhhhhh', res);
  for (var index in res.data) {
    
    this.barChartLabels.push(res.data[index].day+" "+res.data[index].nDay);
     this.barChartData[0].data?.push(res.data[index].nbrTotal);

   }
 
})

this.feedbackService.statSemaineFeed(this.obj).subscribe(res => {
  console.log('hhhhhhhhhhhhhhhhhhhh', res);
  for (var index in res.data) {
    
    this.barChartLabels1.push(res.data[index].day+" "+res.data[index].nDay);
     this.barChartData1[0].data?.push(res.data[index].nbrTotal);

   }
 
})


  }

  date() {
    let date: Date = new Date();
    date.setDate(date.getDate() - 7);
    let datePipe: DatePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }

}
