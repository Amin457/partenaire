import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/guard.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule) ,

 
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { 
//   // children:[
//   //   { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
//   // ],canActivate:[AuthGuard]
// },

  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
