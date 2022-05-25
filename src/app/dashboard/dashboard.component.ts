import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Datestat } from '../models/date-model';
import { StatRecService } from '../services/stat-rec.service';
import { DatePipe, formatDate } from '@angular/common';
import jwt_decode  from 'jwt-decode';
import { Partenaire } from '../models/partenaire_model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {

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
  };
  public barChartLabels: Label[] = ['1/2', '2/2', '3/2', '4/2', '5/2', '6/2', '7/2'];
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
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Réclamations' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Feedbacks' }
  ];

  constructor(private service: StatRecService) {
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
  }

  date() {
    let date: Date = new Date();
    date.setDate(date.getDate() - 7);
    let datePipe: DatePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }


}
