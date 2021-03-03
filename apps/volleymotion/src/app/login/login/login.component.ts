import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import { AuthSelectors } from '../../core/store/selectors';
@Component({
  selector: 'vm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isSiginingInWithEmailAndPassword$: Observable<boolean>;
  loginForm: FormGroup;
  showPassword = false;

  private unsubscribe$ = new Subject();

  constructor(
    private store: Store<StoreState>,
    private actions$: Actions,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.initForm();
    this.isSiginingInWithEmailAndPassword$ = this.store.pipe(
      select(AuthSelectors.selectIsSigningInWithEmailAndPassword)
    );

    this.actions$
      .pipe(
        ofType(AuthActions.SignInWithEMailAndPasswordSuccess),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => this.router.navigate(['']));


  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  login(form: FormGroup) {
    if (form.valid) {
      const credentials = form.value;
      this.store.dispatch(
        AuthActions.SignInWithEmailAndPassword(credentials)
      );
    }
  }
}
