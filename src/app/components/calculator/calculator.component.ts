import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  private fb = inject(FormBuilder);
  
  fuels = [
    { name: 'Unleaded 91', price: 97.14 },
    { name: 'Premium 95', price: 101.60 },
    { name: 'Diesel', price: 93.88 },
    { name: 'Diesel Plus', price: 97.15 },
    { name: 'Kerosene', price: 125.03 }
  ];

  calcForm = this.fb.nonNullable.group({
    dist: [0, [Validators.required]],
    eff: [0, [Validators.required]],
    fuelPrice: [97.14, [Validators.required]]
  });

  total = 0;

  calc() {
    const { dist, eff, fuelPrice } = this.calcForm.getRawValue();
    if (dist > 0 && eff > 0) {
      this.total = (dist / eff) * fuelPrice;
    }
  }
}