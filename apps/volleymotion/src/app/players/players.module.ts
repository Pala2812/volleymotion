import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersRoutingModule } from './players-routing.module';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerCreateComponent } from './player-create/player-create.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PlayerListComponent, PlayerCreateComponent],
  imports: [CommonModule, SharedModule, PlayersRoutingModule],
  exports: [PlayersRoutingModule],
})
export class PlayersModule {}
