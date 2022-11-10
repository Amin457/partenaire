import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback/feedback.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { GererFeedbacksComponent } from './gerer-feedbacks/gerer-feedbacks.component';
import { FeedbackRoutes } from './feedback.routing';
import { RepportFeedComponent } from './repport-feed/repport-feed.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    ChartsModule,
    FeedbackRoutes,
  ],
  declarations: [FeedbackComponent, GererFeedbacksComponent,RepportFeedComponent],
})
export class FeedbackModule {}
