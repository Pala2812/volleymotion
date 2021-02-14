import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts';
import { AgmCoreModule } from '@agm/core';

import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { TimestampPipe } from './pipes/timestamp.pipe';
import { NebularModule } from './nebular/nebular.module';
import { environment } from '../../environments/environment';
import { LoadingCardComponent } from './components/loading-card/loading-card.component';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { TagInputComponent } from './components/tag-input/tag-input.component';

@NgModule({
  declarations: [
    AuthDialogComponent,
    TimestampPipe,
    LoadingCardComponent,
    DeleteDialogComponent,
    TagInputComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    NebularModule,
    GoogleChartsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.firebase.apiKey,
      libraries: ['places'],
    }),
  ],
  exports: [
    ReactiveFormsModule,
    AngularMaterialModule,
    NebularModule,
    AuthDialogComponent,
    LoadingCardComponent,
    DeleteDialogComponent,
    TimestampPipe,
    GoogleChartsModule,
    AgmCoreModule,
  ],
  entryComponents: [AuthDialogComponent, DeleteDialogComponent],
})
export class SharedModule {}
