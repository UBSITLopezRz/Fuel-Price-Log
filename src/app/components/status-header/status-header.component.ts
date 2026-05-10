import { Component, inject } from '@angular/core';
import { FuelService } from '../../services/fuel.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-header.component.html',
  styleUrls: ['./status-header.component.css']
})
export class StatusHeaderComponent {
  fuelService = inject(FuelService);
  status = this.fuelService.appStatus;
}