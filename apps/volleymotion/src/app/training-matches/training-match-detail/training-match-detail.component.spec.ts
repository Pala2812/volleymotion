import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingMatchDetailComponent } from './training-match-detail.component';

describe('TrainingMatchDetailComponent', () => {
  let component: TrainingMatchDetailComponent;
  let fixture: ComponentFixture<TrainingMatchDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingMatchDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingMatchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
