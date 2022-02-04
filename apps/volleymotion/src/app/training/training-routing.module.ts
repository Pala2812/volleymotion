import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingCreateComponent } from './training-create/training-create.component';
import { TrainingListComponent } from './training-list/training-list.component';
import { TrainingUnitDetailComponent } from './training-unit-detail/training-unit-detail.component';
import { TraningDetailComponent } from './traning-detail/traning-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'liste', pathMatch: 'full' },
  { path: 'liste', component: TrainingListComponent },
  { path: 'einheit/bearbeiten/:id', component: TrainingUnitDetailComponent },
  { path: 'einheit/details/:id', component: TrainingUnitDetailComponent },
  { path: 'detail/:id', component: TraningDetailComponent },
  { path: 'erstellen', component: TrainingCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingRoutingModule {}
