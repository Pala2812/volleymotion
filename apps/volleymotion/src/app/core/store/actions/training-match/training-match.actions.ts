import { createAction, props } from '@ngrx/store';
import { TrainingMatch } from '@volleymotion/models';

const key = '[TrainingMatch]';

export const loadTrainingMatches = createAction(`${key} Load Traning Matches`);

export const loadTrainingMatchesSuccess = createAction(
  `${key} Load Training Matches Success`,
  props<{ trainingMatches: TrainingMatch[] }>()
);

export const loadTrainingMatchesFailure = createAction(
  `${key} Load Training Matches Failure`,
  props<{ error: any }>()
);

export const createTrainingMatch = createAction(
  `${key} Create Training Match`,
  props<{ trainingMatch: TrainingMatch }>()
);

export const createTrainingMatchSuccess = createAction(
  `${key} Create Training Match Success`
);

export const createTrainingMatchFailure = createAction(
  `${key} Create Training Match Failure`,
  props<{ error: any }>()
);
