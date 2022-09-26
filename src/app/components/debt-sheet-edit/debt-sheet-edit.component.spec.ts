import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtSheetEditComponent } from './debt-sheet-edit.component';

describe('DebtSheetEditComponent', () => {
  let component: DebtSheetEditComponent;
  let fixture: ComponentFixture<DebtSheetEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebtSheetEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtSheetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
