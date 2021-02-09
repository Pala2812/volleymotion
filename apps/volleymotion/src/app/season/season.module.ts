import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeasonRoutingModule } from './season-routing.module';
import { SeasonListComponent } from './season-list/season-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SeasonListComponent],
  imports: [CommonModule, SharedModule, SeasonRoutingModule],
  exports: [SeasonRoutingModule],
})
export class SeasonModule {}
