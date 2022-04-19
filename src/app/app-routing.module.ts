import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigComponent } from './config/config.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FeedbacktableComponent } from './feedbacktable/feedbacktable.component';
import { HomeAllComponent } from './home-all/home-all.component';
import { HomeComponent } from './home/home.component';
import { JeuxComponent } from './jeux/jeux.component';
import { LoginComponent } from './login/login.component';
import { AddpromoComponent } from './promotions/addpromo/addpromo.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { RepportReclamationsComponent } from './repport-reclamations/repport-reclamations.component';

const routes: Routes = [
  { path: 'dashboard', component: HomeAllComponent ,
  children:[
  { path: 'promotions', component: PromotionsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'jeux', component: JeuxComponent },
  { path: 'réclamations', component:ReclamationComponent},
  { path: 'feedbacks', component: FeedbackComponent },
  { path: 'promotions/addpromo', component: AddpromoComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'feedbacktable', component: FeedbacktableComponent },
  { path: 'repportRec', component: RepportReclamationsComponent }
 
  ]


},
  
{ path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
