import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingMatchFilterComponent } from './training-match-filter.component';

describe('TrainingMatchFilterComponent', () => {
  let component: TrainingMatchFilterComponent;
  let fixture: ComponentFixture<TrainingMatchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingMatchFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingMatchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
