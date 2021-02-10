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
import { User } from '../../core/models';
import { NbToastrService } from '@nebular/theme';

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
    private toastService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.initSignUpForm();

    this.actions$
      .pipe(
        ofType(AuthActions.CreateUserWithEmailAndPasswordSuccess),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => this.router.navigate(['']));

    this.isCreatingUserWithEmailAndPassword$ = this.store.pipe(
      select(AuthSelectors.selectIsCreatingUserWithEMailAndPassword)
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initSignUpForm(): FormGroup {
    return new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      isAgbAccepted: new FormControl(false, [Validators.requiredTrue]),
      isNewsletterAccepted: new FormControl(false),
    });
  }

  signUpWithEmailAndPassword(form: FormGroup) {
    if (form.valid) {
      const controls = form.controls;
      const firstname = controls.firstname.value;
      const lastname = controls.lastname.value;
      const email = controls.email.value;
      const isAgbAccepted = controls.isAgbAccepted.value;
      const isNewsletterAccepted = controls.isNewsletterAccepted.value;
      const password = controls.password.value;

      const userPreferences: UserPreferences = {
        isAgbAccepted,
        isNewsletterAccepted,
        isDataPrivacyAccepted: true,
      };

      const user: Partial<User> = { firstname, lastname, userPreferences };

      this.store.dispatch(
        AuthActions.CreateUserWithEmailAndPassword({
          email,
          password,
          user,
        })
      );
    }
  }

  onCheckboxChanged(control: string, event: any) {
    this.signUpForm.controls[control].patchValue(event.checked);
  }
}
