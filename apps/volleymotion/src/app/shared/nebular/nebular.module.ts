import { NgModule } from '@angular/core';
import {
  NbInputModule,
  NbFormFieldModule,
  NbCardModule,
  NbSelectModule,
  NbButtonModule,
  NbIconModule,
  NbAutocompleteModule,
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
  ],
  exports: [
    NbInputModule,
    NbFormFieldModule,
    NbCardModule,
    NbSelectModule,
    NbButtonModule,
    NbIconModule,
    NbAutocompleteModule,
  ],
})
export class NebularModule {}
