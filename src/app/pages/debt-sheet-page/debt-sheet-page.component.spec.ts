import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtSheetPageComponent } from './debt-sheet-page.component';

describe('DebtSheetPageComponent', () => {
  let component: DebtSheetPageComponent;
  let fixture: ComponentFixture<DebtSheetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebtSheetPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtSheetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
