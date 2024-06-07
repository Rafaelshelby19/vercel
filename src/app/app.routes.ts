import { Routes } from '@angular/router';
import { CentralComponent } from './module/central/central.component';
import { FrutasComponent } from './module/frutas/frutas.component';


export const routes: Routes = [{
    path:'',
    component:CentralComponent
},
{
   path:'',
   component:FrutasComponent
}];
