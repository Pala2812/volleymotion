import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts';
import { AgmCoreModule } from '@agm/core';

import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { RouterModule } from '@angular/router';
import { TimestampPipe } from './pipes/timestamp.pipe';
import { NebularModule } from './nebular/nebular.module';
import { environment } from '../../environments/environment';

@NgModule({
  declarations: [AuthDialogComponent, TimestampPipe],
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
    TimestampPipe,
    GoogleChartsModule,
    AgmCoreModule,
  ],
  entryComponents: [AuthDialogComponent],
})
export class SharedModule {}
