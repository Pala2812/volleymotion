import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { forkJoin, from, of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { Article, SurveyComment, User } from '../../../models';
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
      mergeMap(({ article }) =>
        from(this.fs.doc(`surveys/${article.id}`).set(article)).pipe(
          map(() => SurveyActions.createSurveySuccess()),
          catchError((error) =>
            of(SurveyActions.createSurveyFailure({ error }))
          )
        )
      )
    )
  );

  updateSurvey$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SurveyActions.updateSurvey),
      concatMap(({ article }) =>
        from(this.fs.doc(`surveys/${article?.id}`).ref.update(article)).pipe(
          map(() => SurveyActions.updateSurveySuccess()),
          catchError((error) =>
            of(SurveyActions.updateSurveyFailure({ error }))
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
          .collection<Article>('surveys')
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
          .doc<Article>(`surveys/${id}`)
          .valueChanges()
          .pipe(
            map((article) => SurveyActions.loadSurveyByIdSuccess({ article })),
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

  likeSurveySuccess$ = createEffect(
    () => this.actions$.pipe(ofType(SurveyActions.likeSurveySuccess)),
    { dispatch: false }
  );

  addCommentToSurvey$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SurveyActions.addCommentToSurvey),
      switchMap(({ message }) =>
        from(
          this.fs
            .collection(`surveys/${message.surveyId}/comments`)
            .add(message)
        ).pipe(
          map(() => SurveyActions.addCommentToSurveySuccess()),
          catchError((error) =>
            of(SurveyActions.addCommentToSurveyFailure({ error }))
          )
        )
      )
    )
  );

  loadCommentsFromSurvey$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SurveyActions.loadCommentsOfSurvey),
      switchMap(({ id }) =>
        this.fs
          .collection<SurveyComment>(`surveys/${id}/comments`)
          .valueChanges()
          .pipe(
            mergeMap((surveyComments) =>
              forkJoin(
                surveyComments.map((comment) =>
                  this.fs
                    .doc(`users/${comment.uid}`)
                    .ref.get()
                    .then((doc) => doc.data() as User)
                )
              ).pipe(
                map((users) =>
                  surveyComments.map((comment) => {
                    const user = users.find((user) => user?.uid === comment?.uid);
                    comment.user = user;
                    return comment;
                  })
                )
              )
            ),
            map((surveyComments) =>
              surveyComments.sort(
                (a: any, b: any) =>
                  a?.createdAt?.toMillis() - b?.createdAt?.toMillis()
              )
            ),
            map((surveyComments) =>
              SurveyActions.loadCommentsOfSurveySuccess({ surveyComments })
            ),
            catchError((error) =>
              of(SurveyActions.loadCommentsOfSurveyFailure({ error }))
            )
          )
      )
    )
  );

  reportSurvey$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SurveyActions.reportSurvey),
      withLatestFrom(this.store.pipe(select(AuthSelectors.selectUid))),
      concatMap((params) =>
        from(
          this.fs
            .doc(`surveys/${params[0].id}/reports/${params[1]}`)
            .set({ uid: params[1] })
        ).pipe(
          map(() => SurveyActions.reportSurveySuccess()),
          catchError((error) =>
            of(SurveyActions.reportSurveyFailure({ error }))
          )
        )
      )
    )
  );

  reportSurveySuccess$ = createEffect(
    () => this.actions$.pipe(ofType(SurveyActions.reportSurveySuccess)),
    { dispatch: false }
  );
}
