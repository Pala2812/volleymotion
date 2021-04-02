import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ExercisesRoutingModule } from './exercises-routing.module';
import { ExerciseHomeComponent } from './exercise-home/exercise-home.component';
import { SharedModule } from '../shared/shared.module';
import { ExerciseCreateComponent } from './exercise-create/exercise-create.component';
import { ExerciseStepDialogComponent } from './exercise-create/exercise-step-dialog/exercise-step-dialog.component';


@NgModule({
  declarations: [ExerciseHomeComponent, ExerciseCreateComponent, ExerciseStepDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    DragDropModule,
    ExercisesRoutingModule
  ],
  entryComponents: [ExerciseStepDialogComponent],
  exports: [
    ExercisesRoutingModule
  ]
})
export class ExercisesModule { }
