import { NgModule } from '@angular/core';
import {
  NbInputModule,
  NbFormFieldModule,
  NbCardModule,
  NbSelectModule,
  NbButtonModule,
  NbIconModule,
  NbAutocompleteModule,
  NbTooltipModule,
  NbTimepickerModule,
  NbDatepickerModule,
} from '@nebular/theme';

@NgModule({
  imports: [
    NbInputModule,
    NbFormFieldModule,
    NbCardModule,
    NbSelectModule,
    NbButtonModule,
    NbIconModule,
    NbAutocompleteModule,
    NbTooltipModule,
    NbTimepickerModule,
    NbDatepickerModule,
  ],
  exports: [
    NbInputModule,
    NbFormFieldModule,
    NbCardModule,
    NbSelectModule,
    NbButtonModule,
    NbIconModule,
    NbAutocompleteModule,
    NbTooltipModule,
    NbTimepickerModule,
    NbDatepickerModule
  ],
})
export class NebularModule {}
