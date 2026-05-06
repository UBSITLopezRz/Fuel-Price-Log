import { Component, inject } from '@angular/core';
import { FuelService } from '../../services/fuel.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  market = inject(FuelService).marketStats;
}