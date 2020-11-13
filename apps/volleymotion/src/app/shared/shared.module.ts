import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AuthDialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
  exports: [ReactiveFormsModule, AngularMaterialModule, AuthDialogComponent],
  entryComponents: [AuthDialogComponent],
})
export class SharedModule {}
