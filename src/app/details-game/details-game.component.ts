import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Cadeaux } from '../models/tab-cadeaux-model';
import { JeuxCadeauxService } from '../services/jeux-cadeaux.service';
import { Addcadeau } from '../models/add-cadeau-model';


@Component({
  selector: 'app-details-game',
  templateUrl: './details-game.component.html',
  styleUrls: ['./details-game.component.css']
})
export class DetailsGameComponent implements AfterViewInit {

  
  clicked=false;
  updated=false;
  cadeaux:Cadeaux[]=[];
  addCadeaux:Addcadeau = new Addcadeau();
  id_cadeau!:number;
  description!:string;
  quantity!:number;
  id_part:number=4

  constructor(private service: JeuxCadeauxService) { }


  ngAfterViewInit(): void {
    
  }
  ngOnInit(): void {
    this.service.GetCadeaux().subscribe(res=>{
      console.log(res);
      this.cadeaux=res.data;
      console.log('tableau cadeaux',this.cadeaux);
    })
  }

  onaddclick(){
    this.clicked=!this.clicked;
  }

  update(){
    this.updated=!this.updated;
  }

  addCadeau(){
    console.log(this.id_cadeau,this.description,this.quantity);
    this.addCadeaux.id_part=this.id_part;
    this.addCadeaux.description=this.description;
    this.addCadeaux.quantity=this.quantity;
    console.log(this.addCadeaux);
    this.service.addCadeau(this.addCadeaux).subscribe(res=>{
      console.log(res);
      this.service.GetCadeaux().subscribe(res=>{
        this.cadeaux=res.data;
      })
    })
  }

  deleteCadeau(id_cadeau:number){
    this.service.DeleteCadeau(id_cadeau).subscribe(res=>{
      console.log(res);
      this.service.GetCadeaux().subscribe(res=>{
        this.cadeaux=res.data;
      })
    })
    
  }
}


