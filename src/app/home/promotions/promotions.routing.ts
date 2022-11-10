import { Routes, RouterModule } from '@angular/router';
import { AddpromoComponent } from './addpromo/addpromo.component';
import { PromotionsComponent } from './promotions/promotions.component';

const routes: Routes = [
  {  path: '',component : PromotionsComponent},
  {  path: 'promotions',component : PromotionsComponent},
  {  path: 'addpromo',component : AddpromoComponent},
  {  path: '',redirectTo:'/promotions',  pathMatch:'full'},
];

export const PromotionsRoutes = RouterModule.forChild(routes);
