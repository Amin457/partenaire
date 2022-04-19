import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Feedback } from '../models/feedback-model';
import { FeedbackService } from '../services/feedback.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit', 'Q4', 'Q5', '6'];
  dataSource!: MatTableDataSource<Feedback>;
  idpart!:number;
  dataTable: Feedback[]=[];
  
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
    this.dataSource = new MatTableDataSource();
    this.idpart=this.root.snapshot.params['id'];
    console.log(this.idpart);
    this.service.Getfeedback().subscribe(res => { console.log('res',res.data);
      this.dataSource.data = res.data } )
    console.log('datasource',this.dataSource);
    
    
  }

}

