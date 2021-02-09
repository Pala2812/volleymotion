import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeasonListComponent } from './season-list/season-list.component';

const routes: Routes = [{ path: ':id', component: SeasonListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeasonRoutingModule {}
