import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingListComponent } from './training-list/training-list.component';
import { TraningDetailComponent } from './traning-detail/traning-detail.component';
import { TrainingCreateComponent } from './training-create/training-create.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TrainingListComponent,
    TraningDetailComponent,
    TrainingCreateComponent,
  ],
  imports: [CommonModule, SharedModule, TrainingRoutingModule],
  exports: [TrainingRoutingModule],
})
export class TrainingModule {}
