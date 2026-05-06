import { Component, inject, signal, computed } from '@angular/core';
import { FuelService } from '../../services/fuel.service';

@Component({
  selector: 'app-fuel-table',
  standalone: true,
  templateUrl: './fuel-table.component.html',
  styleUrls: ['./fuel-table.component.css']
})
export class FuelTableComponent {
  private fuelService = inject(FuelService);

  // Bind to the service signals
  selected = this.fuelService.selectedType;
  isAscending = signal<boolean>(true);
  
  // Available fuel categories
  types = ['UNLEADED 91', 'PREMIUM 95', 'DIESEL', 'DIESEL PLUS', 'KEROSENE', 'LPG'];

  // Computed signal that reacts to sort direction and data changes
  sortedData = computed(() => {
    const list = [...this.fuelService.filteredBrands()];
    return list.sort((a, b) => 
      this.isAscending() ? a.price - b.price : b.price - a.price
    );
  });

  toggleSort() {
    this.isAscending.update(val => !val);
  }

  select(t: string) {
    this.fuelService.updateSelectedType(t);
  }
}