import { createAction, props } from '@ngrx/store';
import { Match } from '@volleymotion/models';

const key = '[Match]';

export const loadMatches = createAction(
  `${key} Load Matches`,
  props<{ teamId: string; seasonId: string }>()
);

export const loadMatchesSuccess = createAction(
  `${key} Load Matches Success`,
  props<{ matches: Match[] }>()
);

export const loadMatchesFailure = createAction(
  `${key} Load Matches Failure`,
  props<{ error: any }>()
);

export const createMatch = createAction(
  `${key} Crate Match`,
  props<{ match: Partial<Match> }>()
);

export const createMatchSuccess = createAction(
  `${key} Create Match Success`,
);

export const createMatchFailure = createAction(
  `${key} Create Match Failure`,
  props<{error: any}>()
);

export const setMatch = createAction(
  `${key} Set Match`,
  props<{match: Match}>()
);