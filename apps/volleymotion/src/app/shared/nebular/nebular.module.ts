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
  ],
  exports: [
    NbInputModule,
    NbFormFieldModule,
    NbCardModule,
    NbSelectModule,
    NbButtonModule,
    NbIconModule,
    NbAutocompleteModule,
    NbTooltipModule
  ],
})
export class NebularModule {}
