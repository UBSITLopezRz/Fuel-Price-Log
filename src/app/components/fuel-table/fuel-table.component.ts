import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { FuelService } from '../../services/fuel.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fuel-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fuel-table.component.html',
  styleUrls: ['./fuel-table.component.css']
})
export class FuelTableComponent implements OnInit {
  public fuelService = inject(FuelService);

  selected = this.fuelService.selectedType;
  isAscending = signal<boolean>(true);
  types = ['UNLEADED 91', 'PREMIUM 95', 'DIESEL', 'DIESEL PLUS', 'KEROSENE', 'LPG'];

  ngOnInit() {
    this.fuelService.fetchHistory(); 
  }

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

  onDelete(id: string) {
    this.fuelService.deleteRecord(id);
  }
}