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

export const updateSeason = createAction(
  `${key} Update Season`,
  props<{ season: Partial<Season> }>()
);

export const updateSeasonSuccess = createAction(`${key} Update Season Success`);

export const updateSeasonFailure = createAction(
  `${key} Update Season Failure`,
  props<{ error: any }>()
);

export const loadSeasonById = createAction(
  `${key} Load Season By Id`,
  props<{ id: string }>()
);

export const loadSeasonByIdSuccess = createAction(
  `${key} Load Season By Id Success`,
  props<{ season: Season }>()
);

export const loadSeasonByIdFailure = createAction(
  `${key} Load Season By Id Failure`,
  props<{ error: any }>()
);
