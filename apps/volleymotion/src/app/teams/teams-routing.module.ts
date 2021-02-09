import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamCreateComponent } from './team-create/team-create.component';
import { TeamListComponent } from './team-list/team-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'liste', pathMatch: 'full' },
  { path: 'liste', component: TeamListComponent },
  {
    path: 'erstellen',
    component: TeamCreateComponent,
  },
  {
    path: 'bearbeiten/:id',
    component: TeamCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamsRoutingModule {}
