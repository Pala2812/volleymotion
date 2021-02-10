import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingMatchDetailComponent } from './training-match-detail/training-match-detail.component';

import { TraningMatchesCreateComponent } from './traning-matches-create/traning-matches-create.component';
import { TraningMatchesMapComponent } from './traning-matches-map/traning-matches-map.component';

const routes: Routes = [
  { path: '', redirectTo: 'karte', pathMatch: 'full' },
  { path: 'karte', component: TraningMatchesMapComponent },
  { path: 'detail/:id', component: TrainingMatchDetailComponent },
  { path: 'erstellen', component: TraningMatchesCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingMatchesRoutingModule {}
