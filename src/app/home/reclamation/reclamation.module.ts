import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ReclamtionRoutes } from './reclamtion.routing';
import { ChartsModule } from 'ng2-charts';
import { RepportReclamationsComponent } from './repport-reclamtions/repport-reclamtions.component';

@NgModule({
  imports: [
    CommonModule,
    ReclamtionRoutes,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    ChartsModule

  ],
  declarations: [ReclamationComponent,RepportReclamationsComponent],
})
export class ReclamationModule {}
