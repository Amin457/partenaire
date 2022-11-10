import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepportFeedComponent } from './repport-feed/repport-feed.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { ChartfeedComponent } from './chartfeed/chartfeed.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RepportFeedRoutes } from './repport-feed.routing';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    RepportFeedRoutes
  ],
  declarations: [ChartfeedComponent,RepportFeedComponent]
})
export class RepportFeedModule { }
