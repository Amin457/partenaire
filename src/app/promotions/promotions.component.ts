import { Component, OnInit } from '@angular/core';
import { Promo } from '../models/promotion-model';
import { PromotionService } from '../services/promotion.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  ApiImg= "http://localhost:3000/api/files/get/"
  promotions:Promo[]=[];

  constructor(private service:PromotionService) { }

  ngOnInit(): void {
    this.service.Getall().subscribe(res=>{this.promotions=res.data;
    console.log(res.data)})
    
  }

  

  
   
}
