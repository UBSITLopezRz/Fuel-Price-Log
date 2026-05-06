import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelTable } from './fuel-table.component';

describe('FuelTable', () => {
  let component: FuelTable;
  let fixture: ComponentFixture<FuelTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuelTable],
    }).compileComponents();

    fixture = TestBed.createComponent(FuelTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
