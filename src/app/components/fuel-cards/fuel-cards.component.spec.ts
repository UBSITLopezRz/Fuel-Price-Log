import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelCards } from './fuel-cards.component';

describe('FuelCards', () => {
  let component: FuelCards;
  let fixture: ComponentFixture<FuelCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuelCards],
    }).compileComponents();

    fixture = TestBed.createComponent(FuelCards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
