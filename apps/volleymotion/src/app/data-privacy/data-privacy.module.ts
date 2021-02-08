import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataPrivacyRoutingModule } from './data-privacy-routing.module';
import { DataPrivacyComponent } from './data-privacy/data-privacy.component';
import { NbLayoutModule } from '@nebular/theme';

@NgModule({
  declarations: [DataPrivacyComponent],
  imports: [CommonModule, NbLayoutModule, DataPrivacyRoutingModule],
  exports: [DataPrivacyRoutingModule],
})
export class DataPrivacyModule {}
