import { Routes } from '@angular/router';
import { CentralComponent } from './module/central/central.component';
import { FrutaComponent } from './module/fruta/fruta.component';


export const routes: Routes = [{
    path:'',
    component:CentralComponent
},
{
   path:'',
   component:FrutaComponent
}];
