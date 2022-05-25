import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, } from 'ng2-charts';
import { Statrec } from '../models/stat-rec-model';
import { Datestat } from '../models/date-model';
import { StatRecService } from '../services/stat-rec.service';
import { BarChart } from '../models/bar-chart-model';
import { PieChart } from '../models/pie_chart-model';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-repport-reclamations',
  templateUrl: './repport-reclamations.component.html',
  styleUrls: ['./repport-reclamations.component.css']
})
export class RepportReclamationsComponent implements OnInit {

  //declaration reclamations par accueil
  dateDebut1!: string;
  dateFin1!: string;
  id_part = 4;
  accueil!: number;
  dateDebut!: any;
  dateFin!: any;

  

  //declaration reclamations par prix
  prix!: number;

  //declaration reclamations par qualité
  qualite!: number;

  //declaration reclamations par personnel
  personnel!: number;

  bar!: BarChart[];

  pie!: PieChart[];

  obj: Datestat = new Datestat();

  show = false;

  // Pie-chart 1
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [
    ['Accueil'],
    ['Prix'],
    ['Qualité'],
    'Personnel',
  ];

  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  //Pie-chart 2

  public pieChartOptions2: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels2: Label[] = [];

  public pieChartData2: SingleDataSet = [];
  public pieChartType2: ChartType = 'pie';
  public pieChartLegend2 = true;
  public pieChartPlugins2 = [];

  //bar-chart
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [];

  constructor(private service: StatRecService) {

    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {

  }

  async onGenerate() {

    this.obj.id_part = this.id_part;
    this.dateDebut = new DatePipe('en-US').transform(this.dateDebut1, 'yyyy-MM-dd');
    this.dateFin = new DatePipe('en-US').transform(this.dateFin1, 'yyyy-MM-dd')
    this.obj.dateDebut = this.dateDebut;
    this.obj.dateFin = this.dateFin;
    console.log(this.dateDebut);

    //reclamations par accueil

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

            //reclamation par boutique
            this.service.GetRecBoutique(this.obj).subscribe(res => {
              console.log('boutique',res);
              this.pie=res.data;
              for (var index in this.pie) {
                this.pieChartLabels2[index] = this.pie[index].boutique;
                this.pieChartData2[index]=this.pie[index].rec_boutique;
              }

              //reclamtion par mois
              this.service.GetRecMois(this.obj).subscribe(res => {
                console.log('resMois', res);
                this.bar = res.data;
                console.log('barchat', this.bar);

                
                for (var index in this.bar) {
                  console.log(this.bar[index].month);
                  this.barChartLabels[index] = this.bar[index].month;
                }

                this.pieChartData = [this.accueil, this.prix, this.qualite, this.personnel];

               this.barChartData = [
                  { data: [this.bar[0].nbrTotal], label: 'Series A' }
                ];
                this.show = true;
              })
            })


          })
        })
      })
    })




  }

}
