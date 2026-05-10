import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusHeader } from './status-header.component';

describe('StatusHeader', () => {
  let component: StatusHeader;
  let fixture: ComponentFixture<StatusHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
