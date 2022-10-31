import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastExpanseComponent } from './last-expanse.component';

describe('LastExpanseComponent', () => {
  let component: LastExpanseComponent;
  let fixture: ComponentFixture<LastExpanseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastExpanseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastExpanseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
