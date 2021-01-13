import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersRoutingModule } from './players-routing.module';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerCreateComponent } from './player-create/player-create.component';
import { SharedModule } from '../shared/shared.module';
import { PlayerDetailComponent } from './player-detail/player-detail.component';

@NgModule({
  declarations: [PlayerListComponent, PlayerCreateComponent, PlayerDetailComponent],
  imports: [CommonModule, SharedModule, PlayersRoutingModule],
  exports: [PlayersRoutingModule],
})
export class PlayersModule {}
