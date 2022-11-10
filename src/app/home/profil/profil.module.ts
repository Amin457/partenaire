import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilComponent } from './profil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,FormsModule,  ReactiveFormsModule,
  ],
  declarations: [ProfilComponent]
})
export class ProfilModule { }
