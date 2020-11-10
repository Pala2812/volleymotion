import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { AuthActions } from '../../actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  createUserWithEMailAndPassword = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.CreateUserWithEmailAndPassword),
      mergeMap(({ email, password }) =>
        this.authService.createUserWithEmailAndPassword(email, password).pipe(
          map((user) =>
            AuthActions.CreateUserWithEmailAndPasswordSuccess({ uid: user.uid })
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
}
