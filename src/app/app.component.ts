import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FuelCardsComponent } from './components/fuel-cards/fuel-cards.component';
import { FuelTableComponent } from './components/fuel-table/fuel-table.component';
import { CalculatorComponent } from './components/calculator/calculator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    FuelCardsComponent,
    FuelTableComponent,
    CalculatorComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}