import { Component, inject } from '@angular/core';
import { FuelService } from '../../services/fuel.service';

@Component({
  selector: 'app-fuel-cards',
  standalone: true,
  templateUrl: './fuel-cards.component.html',
  styleUrls: ['./fuel-cards.component.css']
})
export class FuelCardsComponent {
  private fuelService = inject(FuelService);
  fuels = this.fuelService.getFuelTypes();

  selectType(name: string) {
    this.fuelService.updateSelectedType(name);
  }
}