import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingUnitDetailComponent } from './training-unit-detail.component';

describe('TrainingUnitDetailComponent', () => {
  let component: TrainingUnitDetailComponent;
  let fixture: ComponentFixture<TrainingUnitDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingUnitDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingUnitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
