import { createAction, props } from '@ngrx/store';

export const loadSeasons = createAction(
  '[Season] Load Seasons'
);

export const loadSeasonsSuccess = createAction(
  '[Season] Load Seasons Success',
  props<{ data: any }>()
);

export const loadSeasonsFailure = createAction(
  '[Season] Load Seasons Failure',
  props<{ error: any }>()
);
