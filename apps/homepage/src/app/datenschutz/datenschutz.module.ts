import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatenschutzRoutingModule } from './datenschutz-routing.module';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';


@NgModule({
  declarations: [DatenschutzComponent],
  imports: [
    CommonModule,
    DatenschutzRoutingModule
  ],
  exports: [
    DatenschutzRoutingModule,
  ]
})
export class DatenschutzModule { }
