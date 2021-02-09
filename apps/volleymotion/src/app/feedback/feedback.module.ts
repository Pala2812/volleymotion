import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback/feedback.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FeedbackComponent],
  imports: [CommonModule, SharedModule, FeedbackRoutingModule],
  exports: [FeedbackRoutingModule],
})
export class FeedbackModule {}
