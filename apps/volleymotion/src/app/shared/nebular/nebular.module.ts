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
  NbTabsetModule,
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
    NbTabsetModule,
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
    NbTabsetModule,
  ],
})
export class NebularModule {}
