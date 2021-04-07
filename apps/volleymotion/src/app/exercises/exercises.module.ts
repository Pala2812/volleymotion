import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ExercisesRoutingModule } from './exercises-routing.module';
import { ExerciseHomeComponent } from './exercise-home/exercise-home.component';
import { SharedModule } from '../shared/shared.module';
import { ExerciseCreateComponent } from './exercise-create/exercise-create.component';
import { ExerciseStepDialogComponent } from './exercise-create/exercise-step-dialog/exercise-step-dialog.component';
import { ExerciseFormComponent } from './exercise-create/exercise-form/exercise-form.component';
import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';


@NgModule({
  declarations: [ExerciseHomeComponent, ExerciseCreateComponent, ExerciseStepDialogComponent, ExerciseFormComponent, ExerciseDetailComponent],
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
