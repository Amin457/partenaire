import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { ReclamationService } from '../services/reclamation.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Reclamation } from '../models/reclamation-model';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {

  displayedColumns: string[] = ['Nom et Prénom', 'mail', 'sujet', 'réclamation', 'boutique'];
  dataSource!: MatTableDataSource<Reclamation>;
  idpart!:number;
  dataTable: Reclamation[]=[];
  
  @ViewChild(MatPaginator)paginator!: MatPaginator;
  @ViewChild(MatSort)sort!: MatSort;

  constructor(private service:ReclamationService, public root:ActivatedRoute) { }

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
    this.dataSource = new MatTableDataSource();
    this.service.Getreclamation().subscribe(res => { console.log('res',res.results); 
    this.dataSource.data = res.results } )
    console.log('datasource',this.dataSource);
    
  }

}
