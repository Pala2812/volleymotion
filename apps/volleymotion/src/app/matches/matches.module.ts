import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchesRoutingModule } from './matches-routing.module';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchCreateComponent } from './match-create/match-create.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MatchListComponent, MatchCreateComponent],
  imports: [CommonModule, SharedModule, MatchesRoutingModule],
  exports: [MatchesRoutingModule],
})
export class MatchesModule {}
