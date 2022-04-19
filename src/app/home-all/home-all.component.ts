import { Component, OnInit } from '@angular/core';
import jwt_decode  from 'jwt-decode';
import { Partenaire } from '../models/partenaire_model';

@Component({
  selector: 'app-home-all',
  templateUrl: './home-all.component.html',
  styleUrls: ['./home-all.component.css']
})
export class HomeAllComponent implements OnInit {
  
  partenaire!:Partenaire
  token !: any
  decoded: any;

  constructor() { }

  ngOnInit(): void {
    this.token=localStorage.getItem('token');
  this.decoded = jwt_decode(this.token);
  this.partenaire=this.decoded.result;
  console.log(this.partenaire);
  }

}
