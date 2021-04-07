import { createAction, props } from '@ngrx/store';
import { Exercise } from '@volleymotion/models';

const key = '[Exercise]';

export const loadExercises = createAction(
  `${key} Load Exercises`
);

export const loadExercisesSuccess = createAction(
  `${key} Load Exercises Success`,
  props<{ exercises: Exercise[] }>()
);

export const loadExercisesFailure = createAction(
  `${key} Load Exercises Failure`,
  props<{ error: any }>()
);

export const createExercise = createAction(
  `${key} Create Exercise`,
  props<{ exercise: Exercise }>(),
);

export const createExerciseSuccess = createAction(
  `${key} Create Exercise Success`,
);

export const createExerciseFailure = createAction(
  `${key} Create Exercise Failure`,
  props<{ error: any }>()
);

