import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JeuxComponent } from './jeux/jeux.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsGameComponent } from './details-game/details-game.component';
import { JeuxRoutes } from './jeux.routing';

@NgModule({
  imports: [
    CommonModule   , FormsModule,  ReactiveFormsModule,JeuxRoutes
  ],
  declarations: [ DetailsGameComponent,JeuxComponent]
})
export class JeuxModule { }
