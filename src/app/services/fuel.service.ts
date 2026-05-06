import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FuelService {

  marketData = {
    dubaiCrude: '100.86', 
    usdPhp: '61.6780'
  }
  selectedType = signal<string>('UNLEADED 91');

  private fuelTypes = [
    { name: 'UNLEADED 91', priceMin: '93.90', priceMax: '106.23' },
    { name: 'PREMIUM 95', priceMin: '97.90', priceMax: '111.23' },
    { name: 'DIESEL', priceMin: '92.79', priceMax: '96.98' },
    { name: 'DIESEL PLUS', priceMin: '95.89', priceMax: '99.87' },
    { name: 'KEROSENE', priceMin: '120.63', priceMax: '128.33' },
    { name: 'LPG', priceMin: '1,511', priceMax: '1,543' }
  ];

  private brandPrices = [
  // UNLEADED 91
  { brand: 'SHELL', price: 106.23, type: 'UNLEADED 91' },
  { brand: 'CALTEX', price: 99.90, type: 'UNLEADED 91' },
  { brand: 'PETRON', price: 99.10, type: 'UNLEADED 91' },
  { brand: 'PHOENIX', price: 95.50, type: 'UNLEADED 91' },
  { brand: 'CLEANFUEL', price: 93.90, type: 'UNLEADED 91' },

  // PREMIUM 95
  { brand: 'SHELL', price: 111.23, type: 'PREMIUM 95' },
  { brand: 'PETRON', price: 108.50, type: 'PREMIUM 95' },
  { brand: 'TOTAL', price: 99.10, type: 'PREMIUM 95' },
  { brand: 'SEAOIL', price: 97.90, type: 'PREMIUM 95' },

  // DIESEL
  { brand: 'SHELL', price: 92.79, type: 'DIESEL' },
  { brand: 'PETRON', price: 92.50, type: 'DIESEL' },
  { brand: 'JETTI', price: 91.50, type: 'DIESEL' },
  { brand: 'UNIOIL', price: 91.80, type: 'DIESEL' },

  // DIESEL PLUS
  { brand: 'SHELL', price: 99.87, type: 'DIESEL PLUS' },
  { brand: 'CALTEX', price: 102.50, type: 'DIESEL PLUS' },
  { brand: 'PETRON', price: 95.89, type: 'DIESEL PLUS' },

  // KEROSENE
  { brand: 'SHELL', price: 128.33, type: 'KEROSENE' },
  { brand: 'PETRON', price: 124.20, type: 'KEROSENE' },
  { brand: 'CALTEX', price: 120.63, type: 'KEROSENE' },

  // LPG (Price per 11kg cylinder)
  { brand: 'SOLANE', price: 1543.00, type: 'LPG' },
  { brand: 'PETRON GASUL', price: 1520.00, type: 'LPG' },
  { brand: 'PRYCEGAS', price: 1511.00, type: 'LPG' }
];

  getFuelTypes() { return this.fuelTypes; }
  
  // Computed Signal: Updates automatically when selectedType changes
  filteredBrands = computed(() => {
    const current = this.selectedType();
    return this.brandPrices.filter(p => current.includes(p.type));
  });

  updateSelectedType(type: string) {
    this.selectedType.set(type);
  }

  calculate(dist: number, eff: number, price: number): number { 
    return (dist / eff) * price; 
  }
}