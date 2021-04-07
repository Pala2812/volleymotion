import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ExerciseService } from '../../../services/exercise.service';
import { ExerciseActions } from '../../actions';



@Injectable()
export class ExerciseEffects {
  constructor(private actions$: Actions, private exerciseService: ExerciseService) { }

  createExercise$ = createEffect(() => this.actions$.pipe(
    ofType(ExerciseActions.createExercise),
    switchMap(({ exercise }) => this.exerciseService.createExercise(exercise).pipe(
      map(() => ExerciseActions.createExerciseSuccess()),
      catchError((error) => of(ExerciseActions.createExerciseFailure({ error })))
    ))
  ));

  loadExercises$ = createEffect(() => this.actions$.pipe(
    ofType(ExerciseActions.loadExercises),
    switchMap(() => this.exerciseService.loadExercises().pipe(
      map((exercises) => ExerciseActions.loadExercisesSuccess({ exercises })),
      catchError((error) => of(ExerciseActions.loadExercisesFailure({ error })))
    ))
  ));
}
