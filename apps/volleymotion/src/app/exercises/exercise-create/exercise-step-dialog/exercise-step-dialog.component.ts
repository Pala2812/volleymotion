import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'vm-exercise-step-dialog',
  templateUrl: './exercise-step-dialog.component.html',
  styleUrls: ['./exercise-step-dialog.component.scss'],
})
export class ExerciseStepDialogComponent implements OnInit {
  form: FormGroup = new FormGroup({
    description: new FormControl('', []),
  });

  constructor(private dialogRef: NbDialogRef<ExerciseStepDialogComponent>) {}

  ngOnInit(): void {}

  addExerciseStep(form: FormGroup) {
    form.markAllAsTouched();
    if (form.valid) {
      const description = form.value.description;
      this.dialogRef.close(description);
    }
  }
}
