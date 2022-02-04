import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressInputModule } from '@volleymotion/address-input';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingListComponent } from './training-list/training-list.component';
import { TraningDetailComponent } from './traning-detail/traning-detail.component';
import { TrainingCreateComponent } from './training-create/training-create.component';
import { SharedModule } from '../shared/shared.module';
import { TrainingUnitDetailComponent } from './training-unit-detail/training-unit-detail.component';
import { TrainingUnitEditComponent } from './training-unit-edit/training-unit-edit.component';

@NgModule({
  declarations: [
    TrainingListComponent,
    TraningDetailComponent,
    TrainingCreateComponent,
    TrainingUnitDetailComponent,
    TrainingUnitEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AddressInputModule,
    TrainingRoutingModule,
  ],
  exports: [TrainingRoutingModule],
})
export class TrainingModule {}
