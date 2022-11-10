import { Routes, RouterModule } from '@angular/router';
import { ChartfeedComponent } from './chartfeed/chartfeed.component';
import { RepportFeedComponent } from './repport-feed/repport-feed.component';

const routes: Routes = [
  { path: '', component: RepportFeedComponent},
  { path: 'repport-feed', component: RepportFeedComponent},
  { path: 'chartfeed', component: ChartfeedComponent  },
  { path:'',redirectTo:'/repport-feed',pathMatch:'full'},

  
];

export const RepportFeedRoutes = RouterModule.forChild(routes);
