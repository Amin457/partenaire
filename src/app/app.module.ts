import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { JeuxComponent } from './jeux/jeux.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AddpromoComponent } from './promotions/addpromo/addpromo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeAllComponent } from './home-all/home-all.component';
import { RepportReclamationsComponent } from './repport-reclamations/repport-reclamations.component';
import { DetailsGameComponent } from './details-game/details-game.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GererFeedbacksComponent } from './gerer-feedbacks/gerer-feedbacks.component';
import { RepportFeedComponent } from './repport-feed/repport-feed.component';
import { ProfilComponent } from './profil/profil.component';
import { ChartfeedComponent } from './chartfeed/chartfeed.component';
import { ChartsModule } from 'ng2-charts';
import { ToastrModule } from 'ngx-toastr';
import { PromoPipe } from './pipes/promo.pipe';







@NgModule({
  declarations: [
    AppComponent,
    PromotionsComponent,
    JeuxComponent,
    ReclamationComponent,
    FeedbackComponent,
    AddpromoComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    HomeAllComponent,
    RepportReclamationsComponent,
    DetailsGameComponent,
    DashboardComponent,
    NavbarComponent,
    GererFeedbacksComponent,
    RepportFeedComponent,
    ProfilComponent,
    ChartfeedComponent,
    PromoPipe,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    ChartsModule,
    ToastrModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
