import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelInfo } from './fuel-info.component';

describe('FuelInfo', () => {
  let component: FuelInfo;
  let fixture: ComponentFixture<FuelInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuelInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(FuelInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
