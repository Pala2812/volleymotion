import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseStepDialogComponent } from './exercise-step-dialog.component';

describe('ExerciseStepDialogComponent', () => {
  let component: ExerciseStepDialogComponent;
  let fixture: ComponentFixture<ExerciseStepDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseStepDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseStepDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
