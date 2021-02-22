import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressInputModule } from '@volleymotion/address-input';

import { TraningMatchesCreateComponent } from './traning-matches-create/traning-matches-create.component';
import { TraningMatchesMapComponent } from './traning-matches-map/traning-matches-map.component';
import { SharedModule } from '../shared/shared.module';
import { TrainingMatchesRoutingModule } from './training-matches-routing.module';
import { TrainingMatchDetailComponent } from './training-match-detail/training-match-detail.component';
import { TrainingMatchFilterComponent } from './training-match-filter/training-match-filter.component';

@NgModule({
  declarations: [TraningMatchesCreateComponent, TraningMatchesMapComponent, TrainingMatchDetailComponent, TrainingMatchFilterComponent],
  imports: [
    CommonModule,
    AddressInputModule,
    SharedModule,
    TrainingMatchesRoutingModule,
  ],
  entryComponents: [TrainingMatchDetailComponent, TrainingMatchFilterComponent],
  exports: [TrainingMatchesRoutingModule],
})
export class TrainingMatchesModule {}
