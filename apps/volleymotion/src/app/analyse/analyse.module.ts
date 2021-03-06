import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyseRoutingModule } from './analyse-routing.module';
import { AnalyseComponent } from './analyse/analyse.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AnalyseComponent],
  imports: [
    CommonModule,
    SharedModule,
    AnalyseRoutingModule
  ],
  exports: [
    AnalyseRoutingModule
  ]
})
export class AnalyseModule { }
