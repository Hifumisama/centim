import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialDatatabComponent } from './financial-datatab.component';

describe('FinancialDatatabComponent', () => {
  let component: FinancialDatatabComponent;
  let fixture: ComponentFixture<FinancialDatatabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialDatatabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialDatatabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
