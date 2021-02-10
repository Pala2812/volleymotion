import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TrainingMatchService } from '../../../services/training-match.service';
import { TraningMatchActions } from '../../actions';

@Injectable()
export class TrainingMatchEffects {
  constructor(
    private actions$: Actions,
    private trainingMatchService: TrainingMatchService
  ) {}

  createTrainingMatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TraningMatchActions.createTrainingMatch),
      switchMap(({ trainingMatch }) =>
        this.trainingMatchService.createTrainingMatch(trainingMatch).pipe(
          map(() => TraningMatchActions.createTrainingMatchSuccess()),
          catchError((error) =>
            of(TraningMatchActions.createTrainingMatchFailure({ error }))
          )
        )
      )
    )
  );

  loadTrainingMatches$ = createEffect(() => this.actions$.pipe(
    ofType(TraningMatchActions.loadTrainingMatches),
    switchMap(() => this.trainingMatchService.loadTrainingMatches().pipe(
      map((trainingMatches) => TraningMatchActions.loadTrainingMatchesSuccess({trainingMatches})),
      catchError((error) => of(TraningMatchActions.loadTrainingMatchesFailure({error})))
    ))
  ))
}
