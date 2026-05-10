import { Component, inject, signal } from '@angular/core';
import { FuelService } from '../../services/fuel.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fuel-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fuel-info.component.html',
  styleUrls: ['./fuel-info.component.css']
})
export class FuelInfoComponent {
  fuelService = inject(FuelService);
  
  content = this.fuelService.educationalData; 

  activeIndex = signal<number>(-1);

  toggleGuide(index: number) {
    this.activeIndex.set(this.activeIndex() === index ? -1 : index);
  }
}