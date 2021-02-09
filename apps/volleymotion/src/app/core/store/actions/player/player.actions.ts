import { createAction, props } from '@ngrx/store';
import { Player } from '@volleymotion/models';

const key = '[Player]';

export const loadPlayersByTeamId = createAction(
  `${key} Load Players By Team Id`,
  props<{ teamId: string }>()
);

export const loadPlayersByTeamIdSuccess = createAction(
  '[Player] Load Players By Team Id Success',
  props<{ players: Player[] }>()
);

export const loadPlayersByTeamIdFailure = createAction(
  '[Player] Load Players By Team Id Failure',
  props<{ error: any }>()
);

export const createPlayer = createAction(
  `${key} Create Player`,
  props<{ player: Player }>()
);

export const createPlayerSuccess = createAction(`${key} Create Player Success`);

export const createPlayerFailure = createAction(
  `${key} Create Player Failure`,
  props<{ error: any }>()
);

export const deletePlayer = createAction(
  `${key} Delete Player`,
  props<{ player: Player }>()
);
export const deletePlayerSuccess = createAction(
  `${key} Delete Player Succcess`
);
export const deletePlayerFailure = createAction(
  `${key} Delete Player Failure`,
  props<{ error }>()
);
