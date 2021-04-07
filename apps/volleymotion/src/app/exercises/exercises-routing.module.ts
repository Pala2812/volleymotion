import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExerciseCreateComponent } from './exercise-create/exercise-create.component';
import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';
import { ExerciseHomeComponent } from './exercise-home/exercise-home.component';

const routes: Routes = [
  { path: '', redirectTo: 'liste', pathMatch: 'full' },
  { path: 'liste', component: ExerciseHomeComponent },
  { path: 'erstellen', component: ExerciseCreateComponent },
  { path: 'detail', component: ExerciseDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercisesRoutingModule { }
