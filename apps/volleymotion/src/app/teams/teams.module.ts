import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamCreateComponent } from './team-create/team-create.component';
import { SharedModule } from '../shared/shared.module';
import { TeamDetailComponent } from './team-detail/team-detail.component';

@NgModule({
  declarations: [TeamListComponent, TeamCreateComponent, TeamDetailComponent],
  imports: [CommonModule, SharedModule, RouterModule, TeamsRoutingModule],
})
export class TeamsModule {}
