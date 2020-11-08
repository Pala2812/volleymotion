import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class PasswordErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null): boolean {
      return control?.touched && control?.parent?.invalid;
    }
  }