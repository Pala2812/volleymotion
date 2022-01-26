import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoTrainingCreateComponent } from './video-training-create/video-training-create.component';
import { VideoTrainingListComponent } from './video-training-list/video-training-list.component';

const routes: Routes = [
  { path: 'liste', component: VideoTrainingListComponent },
  { path: 'erstellen', component: VideoTrainingCreateComponent },
  { path: 'bearbeiten/:id', component: VideoTrainingCreateComponent },
  { path: '', redirectTo: 'liste', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoTrainingRoutingModule {}
