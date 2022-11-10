import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';
const routes: Routes = [
  { path: '', component: HomeComponent ,
  children: [
    {
      path: 'feedback',
      loadChildren: () => import('./feedback/feedback.module').then((m) => m.FeedbackModule),
    },
       {
      path: 'jeux',
      loadChildren: () => import('./jeux/jeux.module').then((m) => m.JeuxModule),
    },
    {
      path: 'promotions',
      loadChildren: () => import('./promotions/promotions.module').then((m) => m.PromotionsModule),
    },
    {
      path: 'profil',
      loadChildren: () => import('./profil/profil.module').then((m) => m.ProfilModule),
    },

    {
      path: 'reclamation',
      loadChildren: () => import('./reclamation/reclamation.module').then((m) => m.ReclamationModule),
    },

  { path: 'dashboard', component: DashboardComponent }]
}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }
