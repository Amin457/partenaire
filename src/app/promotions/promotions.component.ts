import { Component, OnInit } from '@angular/core';
import { Promo } from '../models/promotion-model';
import { PromotionService } from '../services/promotion.service';
import jwt_decode  from 'jwt-decode';
import { Partenaire } from '../models/partenaire_model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  ApiImg= environment.Api +"api/files/get/"
  promotions:Promo[]=[];
  partenaire!:Partenaire;
  token !: any;
  decoded: any;
  constructor(private service:PromotionService) { }

  ngOnInit(): void {

  this.token=localStorage.getItem('token');
  this.decoded = jwt_decode(this.token);
  this.partenaire=this.decoded.result;
  console.log(this.partenaire);

    this.service.Getall(this.partenaire.id_part).subscribe(res=>{this.promotions=res.data;
    console.log(res.data)})

    
  }

  

  
   
}
