import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FuelService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/history';

  history = signal<any[]>([]);
  selectedType = signal<string>('UNLEADED 91');
  marketData = {
    dubaiCrude: '100.86', 
    usdPhp: '61.6780'
  };

  appStatus = signal({
    verifiedDate: 'May 5, 2026',
    nextUpdate: 'Tue, May 12',
    brandCount: 13,
    description: 'Diesel, gasoline, LPG, and kerosene prices from all major oil companies in the Philippines.'
  });
  educationalData = signal({
    sectionTitle: 'How fuel prices work in the Philippines',
    sectionSubtitle: 'A plain-language guide to the DOE weekly pricing cycle and what drives your pump price',
    introText: "Every Tuesday morning, millions of Filipinos check whether fuel prices went up or down. But the mechanism behind those changes, and why they happen so predictably, is little understood. Here's a complete explanation.",
    
    guides: [
      { id: 0, title: 'Why prices change every Tuesday', content: 'Under the Downstream Oil Industry Deregulation Act of 1998, oil companies set their own prices. However, the industry follows a voluntary guideline to implement changes every Tuesday morning.', isOpen: false },
      { id: 1, title: 'The MOPS formula: how global oil becomes your pump price', content: 'The Mean of Platts Singapore (MOPS) is the daily average of all trading transactions in the regional market.', isOpen: false },
      { id: 2, title: 'The role of excise taxes and VAT', content: 'Taxes account for a significant portion of the pump price, including specific excise taxes under the TRAIN law plus 12% VAT.', isOpen: false },
      { id: 3, title: 'Settled vs. staggered adjustments', content: 'Large price movements are sometimes "staggered" or implemented over several days to avoid market shock.', isOpen: false }
    ],

    quickStats: [
      { label: 'Diesel excise tax', value: '₱6.00', unit: '/L' },
      { label: 'Gasoline excise tax', value: '₱10.00', unit: '/L' },
      { label: 'Kerosene excise tax', value: '₱5.00', unit: '/L' },
      { label: 'LPG excise tax', value: '₱3.00', unit: '/kg' },
      { label: 'VAT on pump price', value: '12%', unit: '' },
      { label: 'Price update day', value: 'Tuesday', unit: '6AM' }
    ]
  });

  private fuelTypes = [
    { name: 'UNLEADED 91', priceMin: '93.90', priceMax: '106.23' },
    { name: 'PREMIUM 95', priceMin: '97.90', priceMax: '111.23' },
    { name: 'DIESEL', priceMin: '92.79', priceMax: '96.98' },
    { name: 'DIESEL PLUS', priceMin: '95.89', priceMax: '99.87' },
    { name: 'KEROSENE', priceMin: '120.63', priceMax: '128.33' },
    { name: 'LPG', priceMin: '1,511', priceMax: '1,543' }
  ];

  private brandPrices = [
  { brand: 'SHELL', price: 106.23, type: 'UNLEADED 91' },
  { brand: 'CALTEX', price: 99.90, type: 'UNLEADED 91' },
  { brand: 'PETRON', price: 99.10, type: 'UNLEADED 91' },
  { brand: 'SEAOIL', price: 96.45, type: 'UNLEADED 91' },
  { brand: 'JETTI', price: 95.80, type: 'UNLEADED 91' },
  { brand: 'PHOENIX', price: 95.50, type: 'UNLEADED 91' },
  { brand: 'CLEANFUEL', price: 93.90, type: 'UNLEADED 91' },
  { brand: 'SHELL', price: 111.23, type: 'PREMIUM 95' },
  { brand: 'CALTEX', price: 110.50, type: 'PREMIUM 95' },
  { brand: 'PETRON', price: 108.50, type: 'PREMIUM 95' },
  { brand: 'SEAOIL', price: 104.20, type: 'PREMIUM 95' },
  { brand: 'UNIOIL', price: 102.75, type: 'PREMIUM 95' },
  { brand: 'PHOENIX', price: 97.90, type: 'PREMIUM 95' },
  { brand: 'SHELL', price: 92.79, type: 'DIESEL' },
  { brand: 'PETRON', price: 92.50, type: 'DIESEL' },
  { brand: 'CALTEX', price: 91.95, type: 'DIESEL' },
  { brand: 'SEAOIL', price: 89.40, type: 'DIESEL' },
  { brand: 'UNIOIL', price: 88.90, type: 'DIESEL' },
  { brand: 'CLEANFUEL', price: 86.50, type: 'DIESEL' },
  { brand: 'PETRON', price: 128.33, type: 'KEROSENE' },
  { brand: 'SHELL', price: 127.50, type: 'KEROSENE' },
  { brand: 'CALTEX', price: 125.10, type: 'KEROSENE' },
  { brand: 'SEAOIL', price: 120.63, type: 'KEROSENE' },
  { brand: 'SOLANE', price: 1543.00, type: 'LPG' },
  { brand: 'PETRON GASUL', price: 1535.00, type: 'LPG' },
  { brand: 'PRYCEGAS', price: 1520.00, type: 'LPG' },
  { brand: 'EC GAS', price: 1511.00, type: 'LPG' }
];

  getFuelTypes() { 
    return this.fuelTypes; 
  }

  updateSelectedType(type: string) {
    this.selectedType.set(type);
  }

  calculate(dist: number, eff: number, price: number): number { 
    return (dist / eff) * price; 
  }

  filteredBrands = computed(() => {
    const current = this.selectedType();
    return this.brandPrices.filter(p => current.includes(p.type));
  });

  fetchHistory() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
        this.history.set(data);
    });
  }
  
  saveCalculation(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  deleteRecord(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => this.history.update(list => list.filter(item => item._id !== id))
    ); 
  }

  updateRecord(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}