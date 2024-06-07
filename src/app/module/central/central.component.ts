import { Component } from '@angular/core';
import { FrutasComponent } from '../frutas/frutas.component';


@Component({
  selector: 'app-central',
  standalone: true,
  imports: [ FrutasComponent ],
  templateUrl: './central.component.html',
  styleUrl: './central.component.css'
})
export class CentralComponent {

}
