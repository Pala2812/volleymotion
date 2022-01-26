import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoTrainingRoutingModule } from './video-training-routing.module';
import { VideoTrainingListComponent } from './video-training-list/video-training-list.component';
import { VideoTrainingCreateComponent } from './video-training-create/video-training-create.component';

@NgModule({
  declarations: [VideoTrainingListComponent, VideoTrainingCreateComponent],
  imports: [CommonModule, VideoTrainingRoutingModule],
})
export class VideoTrainingModule {}
