import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Feedback } from '../models/feedback-model';
import { FeedbackService } from '../services/feedback.service';
import { Partenaire } from '../models/partenaire_model';
import jwt_decode  from 'jwt-decode';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  displayedColumns: string[] = ['Nom', 'Prénom', 'Question', 'Réponse'];
  dataSource!: MatTableDataSource<Feedback>;
  idpart!:number;
  dataTable: Feedback[]=[];
  partenaire!:Partenaire
  token !: any
  decoded: any;
  
  @ViewChild(MatPaginator)paginator!: MatPaginator;
  @ViewChild(MatSort)sort!: MatSort;

 
  
  constructor(private service:FeedbackService, public root:ActivatedRoute) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }
 
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ngOnInit(): void {
    this.token=localStorage.getItem('token');
    this.decoded = jwt_decode(this.token);
    this.partenaire=this.decoded.result;
    console.log(this.partenaire);

    this.dataSource = new MatTableDataSource();
    this.service.Getfeedback(this.partenaire.id_part).subscribe(res => { console.log('res',res.data);
      this.dataSource.data = res.data } )
    console.log('datasource',this.dataSource);
    
    
  }

}

