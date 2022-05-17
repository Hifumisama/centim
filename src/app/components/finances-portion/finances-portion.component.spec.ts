import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancesPortionComponent } from './finances-portion.component';

describe('FinancesPortionComponent', () => {
  let component: FinancesPortionComponent;
  let fixture: ComponentFixture<FinancesPortionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancesPortionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancesPortionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
