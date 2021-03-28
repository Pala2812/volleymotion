import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExercisesRoutingModule } from './exercises-routing.module';
import { ExerciseHomeComponent } from './exercise-home/exercise-home.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ExerciseHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    ExercisesRoutingModule
  ],
  exports: [
    ExercisesRoutingModule
  ]
})
export class ExercisesModule { }
