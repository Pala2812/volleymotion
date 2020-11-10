import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../core/services/auth.service';
import { AuthActions } from '../../core/store/actions';
import { AuthSelectors } from '../../core/store/selectors';
import { StoreState } from '../../core/store/reducers';
import { PasswordErrorMatcher } from '../password-error-matcher';

@Component({
  selector: 'vm-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  isCreatingUserWithEmailAndPassword$: Observable<boolean>;
  signUpForm: FormGroup;
  passwordMatcher = new PasswordErrorMatcher();

  private unsubscribe$ = new Subject();

  constructor(
    private store: Store<StoreState>,
    private actions$: Actions,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.initSignUpForm();

    this.actions$
      .pipe(
        ofType(AuthActions.CreateUserWithEmailAndPasswordSuccess),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(({ uid }) => this.router.navigate([`benutzer/erstellen/${uid}`]));

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
      const password = controls.password.value;

      this.store.dispatch(
        AuthActions.CreateUserWithEmailAndPassword({ email, password })
      );
    }
  }
}
