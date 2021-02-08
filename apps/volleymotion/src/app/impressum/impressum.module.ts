import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpressumRoutingModule } from './impressum-routing.module';
import { ImpressumComponent } from './impressum/impressum.component';
import { NbLayoutModule } from '@nebular/theme';

@NgModule({
  declarations: [ImpressumComponent],
  imports: [CommonModule, NbLayoutModule, ImpressumRoutingModule],
  exports: [ImpressumRoutingModule],
})
export class ImpressumModule {}
