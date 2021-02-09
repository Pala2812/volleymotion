import { createAction, props } from '@ngrx/store';
import { Season } from '@volleymotion/models';

const key = '[Season]';

export const loadSeasonsByTeamId = createAction(
  `${key} load Seasons By Team Id`,
  props<{ teamId: string }>()
);

export const loadSeasonsByTeamIdSuccess = createAction(
  `${key} Load Seasons By Team Id Success`,
  props<{ seasons: Season[] }>()
);

export const loadSeasonsByTeamIdFailure = createAction(
  `${key} Load Seasons Failure`,
  props<{ error: any }>()
);

export const setSeason = createAction(
  `${key} Set Season`,
  props<{ season: Season }>()
);
