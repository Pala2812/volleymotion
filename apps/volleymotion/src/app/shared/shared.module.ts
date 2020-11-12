import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';

@NgModule({
  declarations: [AuthDialogComponent],
  imports: [CommonModule, ReactiveFormsModule, AngularMaterialModule],
  exports: [ReactiveFormsModule, AngularMaterialModule, AuthDialogComponent],
  entryComponents: [AuthDialogComponent]
})
export class SharedModule {}
