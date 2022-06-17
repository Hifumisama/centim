import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtResumeComponent } from './debt-resume.component';

describe('DebtResumeComponent', () => {
  let component: DebtResumeComponent;
  let fixture: ComponentFixture<DebtResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebtResumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
