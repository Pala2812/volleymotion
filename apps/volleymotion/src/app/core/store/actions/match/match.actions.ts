import { createAction, props } from '@ngrx/store';

export const loadMatchs = createAction(
  '[Match] Load Matchs'
);

export const loadMatchsSuccess = createAction(
  '[Match] Load Matchs Success',
  props<{ data: any }>()
);

export const loadMatchsFailure = createAction(
  '[Match] Load Matchs Failure',
  props<{ error: any }>()
);
