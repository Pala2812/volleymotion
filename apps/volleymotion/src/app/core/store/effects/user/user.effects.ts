import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import {
  catchError,
  concatMap,
  filter,
  map,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { User } from '../../../models';

import { UserActions } from '../../actions';
import { StoreState } from '../../reducers';
import { AuthSelectors } from '../../selectors';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store<StoreState>,
    private fs: AngularFirestore
  ) {}

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.UpdateUser),
      withLatestFrom(this.store.pipe(select(AuthSelectors.selectUid))),
      concatMap((params) =>
        from(
          this.fs.doc<User>(`users/${params[1]}`).update(params[0].user)
        ).pipe(
          map(() => UserActions.UpdateUserSuccess({ user: params[0].user })),
          catchError((error) => {
            return of(UserActions.UpdateUserFailure({ error }));
          })
        )
      )
    )
  );

  setUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.setUser),
        filter((user) => !!user),
        tap(({ user }) => localStorage.setItem('user', JSON.stringify(user)))
      ),
    { dispatch: false }
  );
}
