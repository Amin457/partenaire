import { Routes, RouterModule } from '@angular/router';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { RepportReclamationsComponent } from './repport-reclamtions/repport-reclamtions.component';

const routes: Routes = [
  {path:'',component:ReclamationComponent  },
  {path:'reclamation',component:ReclamationComponent  },
  {path:'repport-reclamation',component:RepportReclamationsComponent  },
  {path:'', redirectTo:'reclamation' ,pathMatch:'full'  },
];

export const ReclamtionRoutes = RouterModule.forChild(routes);
