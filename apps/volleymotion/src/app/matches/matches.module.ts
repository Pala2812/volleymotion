import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressInputModule } from '@volleymotion/address-input';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { MatchesRoutingModule } from './matches-routing.module';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchCreateComponent } from './match-create/match-create.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { MatchCommentItemComponent } from './shared/components/match-comment-item/match-comment-item.component';

@NgModule({
  declarations: [MatchListComponent, MatchCreateComponent, MatchDetailComponent, MatchCommentItemComponent],
  imports: [CommonModule, FormsModule, AddressInputModule, SharedModule, MatchesRoutingModule],
  exports: [MatchesRoutingModule],
})
export class MatchesModule { }
