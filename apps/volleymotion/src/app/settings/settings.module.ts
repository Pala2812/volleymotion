import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsHomeComponent } from './settings-home/settings-home.component';


@NgModule({
  declarations: [SettingsHomeComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ],
  exports: [
    SettingsRoutingModule,
  ]
})
export class SettingsModule { }
