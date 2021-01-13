import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeasonRoutingModule } from './season-routing.module';
import { SeasonListComponent } from './season-list/season-list.component';


@NgModule({
  declarations: [SeasonListComponent],
  imports: [
    CommonModule,
    SeasonRoutingModule
  ]
})
export class SeasonModule { }
