import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamCreateComponent } from './team-create/team-create.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TeamListComponent, TeamCreateComponent],
  imports: [CommonModule, SharedModule, RouterModule, TeamsRoutingModule],
})
export class TeamsModule {}
