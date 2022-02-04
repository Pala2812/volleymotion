import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingUnitEditComponent } from './training-unit-edit.component';

describe('TrainingUnitEditComponent', () => {
  let component: TrainingUnitEditComponent;
  let fixture: ComponentFixture<TrainingUnitEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingUnitEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingUnitEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
