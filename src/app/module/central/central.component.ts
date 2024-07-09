import { Component } from '@angular/core';
import { FrutaComponent } from '../fruta/fruta.component';


@Component({
  selector: 'app-central',
  standalone: true,
  imports: [ FrutaComponent ],
  templateUrl: './central.component.html',
  styleUrl: './central.component.css'
})
export class CentralComponent {

}
