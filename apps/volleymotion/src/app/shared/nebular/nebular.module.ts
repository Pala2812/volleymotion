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
  NbLayoutModule,
  NbCheckboxModule,
  NbToastrModule,
  NbSpinnerModule,
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
    NbLayoutModule,
    NbCheckboxModule,
    NbToastrModule,
    NbSpinnerModule,
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
    NbDatepickerModule,
    NbLayoutModule,
    NbCheckboxModule,
    NbToastrModule,
    NbSpinnerModule,
  ],
})
export class NebularModule {}
