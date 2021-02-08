import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { AuthService } from '../../../services/auth.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { AuthActions } from '../../actions';
import { SignInWithEmailAndPasswordFailure } from '../../actions/auth/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private snackbar: SnackbarService
  ) {}

  createUserWithEMailAndPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.CreateUserWithEmailAndPassword),
      mergeMap(({ email, password, user }) =>
        this.authService
          .createUserWithEmailAndPassword(email, password, user)
          .pipe(
            map((user) =>
              AuthActions.CreateUserWithEmailAndPasswordSuccess({
                uid: user.uid,
              })
            ),
            catchError((error) =>
              of(AuthActions.CreateUserWithEmaiAndPasswordFailure({ error }))
            )
          )
      )
    )
  );

  signInWithEmailAndPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SignInWithEmailAndPassword),
      mergeMap(({ email, password }) =>
        this.authService.signInWithEmailAndPassword(email, password).pipe(
          map((user) =>
            AuthActions.SignInWithEMailAndPasswordSuccess({ uid: user.uid })
          ),
          catchError((error) =>
            of(AuthActions.SignInWithEmailAndPasswordFailure({ error }))
          )
        )
      )
    )
  );

  onError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthActions.CreateUserWithEmaiAndPasswordFailure,
          SignInWithEmailAndPasswordFailure
        ),
        tap(({ error }) => this.snackbar.openSnackbar(error?.message, 'error'))
      ),
    { dispatch: false }
  );

  signOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signOut),
        tap(() => this.authService.signOut())
      ),
    { dispatch: false }
  );
}
