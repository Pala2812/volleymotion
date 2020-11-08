import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule],
  exports: [MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule],
})
export class AngularMaterialModule {}
