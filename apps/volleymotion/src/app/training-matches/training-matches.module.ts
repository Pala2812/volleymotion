import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressInputModule } from '@volleymotion/address-input';

import { TraningMatchesCreateComponent } from './traning-matches-create/traning-matches-create.component';
import { TraningMatchesMapComponent } from './traning-matches-map/traning-matches-map.component';
import { SharedModule } from '../shared/shared.module';
import { TrainingMatchesRoutingModule } from './training-matches-routing.module';
import { TrainingMatchDetailComponent } from './training-match-detail/training-match-detail.component';

@NgModule({
  declarations: [TraningMatchesCreateComponent, TraningMatchesMapComponent, TrainingMatchDetailComponent],
  imports: [
    CommonModule,
    AddressInputModule,
    SharedModule,
    TrainingMatchesRoutingModule,
  ],
  exports: [TrainingMatchesRoutingModule],
})
export class TrainingMatchesModule {}
