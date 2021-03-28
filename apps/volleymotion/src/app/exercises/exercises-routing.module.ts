import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExerciseHomeComponent } from './exercise-home/exercise-home.component';

const routes: Routes = [{ path: '', component: ExerciseHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercisesRoutingModule { }
