import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';

import { FeedbackComponent } from './feedback/feedback.component';
import { JeuxComponent } from './jeux/jeux.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { ReclamationComponent } from './reclamation/reclamation.component';



@NgModule({

  declarations: [
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    FeedbackComponent,
    PromotionsComponent,
    JeuxComponent,
    ReclamationComponent,
    // GererFeedbacksComponent,

    // ProfilComponent,

     
    // RepportFeedComponent,
    // RepportReclamationsComponent,
    // PromoPipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    ToastrModule.forRoot()
  ]
})
export class HomeModule { }
