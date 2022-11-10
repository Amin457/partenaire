import { Routes, RouterModule } from '@angular/router';
import { FeedbackComponent } from './feedback/feedback.component';
import { GererFeedbacksComponent } from './gerer-feedbacks/gerer-feedbacks.component';
import { RepportFeedComponent } from './repport-feed/repport-feed.component';


const routes: Routes = [
  { path: '', component: FeedbackComponent},
  { path: 'gererfeedbacks', component: GererFeedbacksComponent },
  {
    path: 'repport-feed',
    loadChildren: () => import('./repport-feed/repport-feed.module').then((m) => m.RepportFeedModule),
  },

];

export const FeedbackRoutes = RouterModule.forChild(routes);
