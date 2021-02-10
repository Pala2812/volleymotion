import { createAction, props } from '@ngrx/store';

export const loadTrainingMatchs = createAction(
  '[TrainingMatch] Load TrainingMatchs'
);

export const loadTrainingMatchsSuccess = createAction(
  '[TrainingMatch] Load TrainingMatchs Success',
  props<{ data: any }>()
);

export const loadTrainingMatchsFailure = createAction(
  '[TrainingMatch] Load TrainingMatchs Failure',
  props<{ error: any }>()
);
