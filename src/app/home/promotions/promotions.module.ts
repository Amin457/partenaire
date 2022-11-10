import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionsComponent } from './promotions/promotions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddpromoComponent } from './addpromo/addpromo.component';
import { PromoPipe } from 'src/app/pipes/promo.pipe';
import { PromotionsRoutes } from './promotions.routing';


@NgModule({
  imports: [
    CommonModule,FormsModule,  ReactiveFormsModule,PromotionsRoutes
  ],
  declarations: [AddpromoComponent,PromotionsComponent,PromoPipe]
})
export class PromotionsModule { }
