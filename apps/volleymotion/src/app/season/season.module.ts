import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeasonRoutingModule } from './season-routing.module';
import { SeasonListComponent } from './season-list/season-list.component';
import { SharedModule } from '../shared/shared.module';
import { SeasonEditComponent } from './season-edit/season-edit.component';

@NgModule({
  declarations: [SeasonListComponent, SeasonEditComponent],
  imports: [CommonModule, SharedModule, SeasonRoutingModule],
  exports: [SeasonRoutingModule],
})
export class SeasonModule {}
