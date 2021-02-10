import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { NbFormFieldModule, NbInputModule } from '@nebular/theme';
import { AddressInputComponent } from './address-input/address-input.component';
@NgModule({
  declarations: [AddressInputComponent],
  imports: [CommonModule, AgmCoreModule, NbFormFieldModule, NbInputModule],
  exports: [AddressInputComponent],
})
export class AddressInputModule {}
