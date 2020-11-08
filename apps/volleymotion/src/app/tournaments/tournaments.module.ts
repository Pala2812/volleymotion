import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentsRoutingModule } from './tournaments-routing.module';
import { TournamentListComponent } from './tournament-list/tournament-list.component';


@NgModule({
  declarations: [TournamentListComponent],
  imports: [
    CommonModule,
    TournamentsRoutingModule
  ]
})
export class TournamentsModule { }
