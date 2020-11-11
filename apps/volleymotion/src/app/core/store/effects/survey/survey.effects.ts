import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { Survey } from '../../../models';
import { SurveyActions } from '../../actions';
import { StoreState } from '../../reducers';
import { AuthSelectors } from '../../selectors';

@Injectable()
export class SurveyEffects {
  constructor(
    private actions$: Actions,
    private store: Store<StoreState>,
    private fs: AngularFirestore
  ) {}

  createSurvey$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SurveyActions.createSurvey),
      mergeMap(({ survey }) =>
        from(this.fs.collection('surveys').add(survey)).pipe(
          map(() => SurveyActions.createSurveySuccess()),
          catchError((error) =>
            of(SurveyActions.createSurveyFailure({ error }))
          )
        )
      )
    )
  );

  loadSurvey$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SurveyActions.loadSurveys),
      mergeMap(() =>
        this.fs
          .collection<Survey>('surveys')
          .valueChanges()
          .pipe(
            map((surveys) => SurveyActions.loadSurveysSuccess({ surveys })),
            catchError((error) =>
              of(SurveyActions.loadSurveysFailure({ error }))
            )
          )
      )
    )
  );

  loadSurveyById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SurveyActions.loadSurveyById),
      mergeMap(({ id }) =>
        this.fs
          .doc<Survey>(`surveys/${id}`)
          .valueChanges()
          .pipe(
            map((survey) => SurveyActions.loadSurveyByIdSuccess({ survey })),
            catchError((error) =>
              of(SurveyActions.loadSurveyByIdFailure({ error }))
            )
          )
      )
    )
  );

  likeSurvey$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SurveyActions.likeSurvey),
      withLatestFrom(this.store.pipe(select(AuthSelectors.selectUid))),
      mergeMap((params) =>
        from(
          this.fs
            .doc(`surveys/${params[0].id}/likes/${params[1]}`)
            .set({ uid: params[1] })
        ).pipe(
          map(() => SurveyActions.likeSurveySuccess()),
          catchError((error) => of(SurveyActions.likeSurveyFailure({ error })))
        )
      )
    )
  );
}
