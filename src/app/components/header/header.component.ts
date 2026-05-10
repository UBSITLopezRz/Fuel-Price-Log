import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuelService } from '../../services/fuel.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  market = inject(FuelService).marketData;

}