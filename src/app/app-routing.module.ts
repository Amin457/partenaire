import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsGameComponent } from './details-game/details-game.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AuthGuard } from './gaurd/guard.guard';
import { GererFeedbacksComponent } from './gerer-feedbacks/gerer-feedbacks.component';
import { HomeAllComponent } from './home-all/home-all.component';
import { JeuxComponent } from './jeux/jeux.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfilComponent } from './profil/profil.component';
import { AddpromoComponent } from './promotions/addpromo/addpromo.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { RepportFeedComponent } from './repport-feed/repport-feed.component';
import { RepportReclamationsComponent } from './repport-reclamations/repport-reclamations.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  { path: 'dashboard', component: HomeAllComponent ,
  children:[
  { path: 'promotions', component: PromotionsComponent },
  { path: 'home', component: DashboardComponent },
  { path: 'jeux', component: JeuxComponent },
  { path: 'réclamations', component:ReclamationComponent},
  { path: 'feedbacks', component: FeedbackComponent },
  { path: 'promotions/addpromo', component: AddpromoComponent },
  { path: 'repportRec', component: RepportReclamationsComponent },
  { path: 'jeux/details-game', component: DetailsGameComponent },
  { path: 'gererfeedbacks', component: GererFeedbacksComponent },
  { path: 'repportFeed', component: RepportFeedComponent },
  { path: 'profil', component: ProfilComponent },
  ],canActivate:[AuthGuard]
},

  
{ path: 'login', component: LoginComponent },

  {
     path: 'home',
     canActivate:[ AuthGuard ],
     loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },

];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
