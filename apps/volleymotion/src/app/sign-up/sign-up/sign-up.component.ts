import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthActions } from '../../core/store/actions';
import { AuthSelectors } from '../../core/store/selectors';
import { StoreState } from '../../core/store/reducers';
import { PasswordErrorMatcher } from '../password-error-matcher';
import { UserPreferences } from '../../core/models/user-preferences.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'vm-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  isCreatingUserWithEmailAndPassword$: Observable<boolean>;
  signUpForm: FormGroup;
  passwordMatcher = new PasswordErrorMatcher();
  userPreferences: UserPreferences = {
    isAgbAccepted: false,
    isDataPrivacyAccepted: false,
    isNewsletterAccepted: false,
  };

  private unsubscribe$ = new Subject();

  constructor(
    private store: Store<StoreState>,
    private actions$: Actions,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.initSignUpForm();

    this.actions$
      .pipe(
        ofType(AuthActions.CreateUserWithEmailAndPasswordSuccess),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(({ uid }) =>
        this.router.navigate([`benutzer/erstellen/${uid}`])
      );

    this.actions$
      .pipe(
        ofType(AuthActions.CreateUserWithEmaiAndPasswordFailure),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(({ error }) =>
        this.snackbar.open(error.message, undefined, {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end',
        })
      );

    this.isCreatingUserWithEmailAndPassword$ = this.store.pipe(
      select(AuthSelectors.selectIsCreatingUserWithEMailAndPassword)
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initSignUpForm(): FormGroup {
    return new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        passwordMatch: new FormControl(''),
        isAgbAccepted: new FormControl(false, [Validators.requiredTrue]),
        isDataPrivacyAccepted: new FormControl(false, [
          Validators.requiredTrue,
        ]),
        isNewsletterAccepted: new FormControl(false),
      },
      { validators: [this.validatePassword] }
    );
  }

  validatePassword(group: FormGroup) {
    const password = group.get('password').value;
    const passwordMatch = group.get('passwordMatch').value;

    return password === passwordMatch ? null : { mismatch: true };
  }

  signUpWithEmailAndPassword(form: FormGroup) {
    if (form.valid) {
      const controls = form.controls;
      const email = controls.email.value;
      const isAgbAccepted = controls.isAgbAccepted.value;
      const isDataPrivacyAccepted = controls.isDataPrivacyAccepted.value;
      const isNewsletterAccepted = controls.isNewsletterAccepted.value;
      const password = controls.password.value;

      const userPreferences: UserPreferences = {
        isAgbAccepted,
        isDataPrivacyAccepted,
        isNewsletterAccepted,
      };
      this.store.dispatch(
        AuthActions.CreateUserWithEmailAndPassword({
          email,
          password,
          userPreferences,
        })
      );
    }
  }

  onCheckboxChanged(control: string, event: any) {
    this.signUpForm.controls[control].patchValue(event.checked);
  }
}
