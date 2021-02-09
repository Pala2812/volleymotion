import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeasonEditComponent } from './season-edit/season-edit.component';
import { SeasonListComponent } from './season-list/season-list.component';

const routes: Routes = [
  { path: ':id', component: SeasonListComponent },
  { path: 'bearbeiten/:id/:teamId', component: SeasonEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeasonRoutingModule {}
