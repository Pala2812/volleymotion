import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { RouterModule } from '@angular/router';
import { TimestampPipe } from './pipes/timestamp.pipe';
import { NebularModule } from './nebular/nebular.module';

@NgModule({
  declarations: [AuthDialogComponent, TimestampPipe],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    NebularModule,
  ],
  exports: [
    ReactiveFormsModule,
    AngularMaterialModule,
    NebularModule,
    AuthDialogComponent,
    TimestampPipe,
  ],
  entryComponents: [AuthDialogComponent],
})
export class SharedModule {}
