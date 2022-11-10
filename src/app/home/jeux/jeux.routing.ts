import { Routes, RouterModule } from '@angular/router';
import { DetailsGameComponent } from './details-game/details-game.component';
import { JeuxComponent } from './jeux/jeux.component';

const routes: Routes = [
  { path: '', component: JeuxComponent},
  { path: 'jeux', component: JeuxComponent},
  { path: 'details-game', component: DetailsGameComponent  },
  { path:'',redirectTo:'/jeux',pathMatch:'full'},
];

export const JeuxRoutes = RouterModule.forChild(routes);
