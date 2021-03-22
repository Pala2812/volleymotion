import { createAction, props } from '@ngrx/store';
import { Player, PlayerComment } from '@volleymotion/models';
import { PlayerCommentComponent } from 'apps/volleymotion/src/app/players/shared/components/player-comment/player-comment.component';

const key = '[Player]';

export const loadPlayers = createAction(
  `${key} Load Players By Team Id`,
  props<{ teamId: string, seasonId: string }>()
);

export const loadPlayersSuccess = createAction(
  '[Player] Load Players By Team Id Success',
  props<{ players: Player[] }>()
);

export const loadPlayersFailure = createAction(
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

export const updatePlayer = createAction(
  `${key} Update Player`,
  props<{ player: Player }>()
);

export const updatePlayerSuccess = createAction(
  `${key} Update Player Success`,
);

export const updatePlayerFailure = createAction(
  `${key} Update Player Failure`,
  props<{ error: any }>()
);

export const setPlayer = createAction(
  `${key} Set Player`,
  props<{ player: Player }>()
);

export const addCommentToPlayer = createAction(
  `${key} Add Comment To Player`,
  props<{ playerComment: PlayerComment | Partial<PlayerComment> }>()
);

export const addCommentToPlayerSuccess = createAction(
  `${key} Add Comment To Player Success`,
);

export const addCommentToPlayerFailure = createAction(
  `${key} Add Comment To Player Failure`,
  props<{ error: any }>()
);

export const loadPlayerComments = createAction(
  `${key} load Player Comments`,
  props<{ player: Player }>(),
);

export const loadPlayerCommentsSuccess = createAction(
  `${key} load Player Comments Success`,
  props<{ playerComments: PlayerComment[] }>(),
);

export const loadPlayerCommentsFailure = createAction(
  `${key} load Player Comments Failure`,
  props<{ error: any }>(),
);

export const deletePlayerComment = createAction(
  `${key} delete Player Comment`,
  props<{ playerComment: PlayerComment }>(),
);

export const deletePlayerCommentSuccess = createAction(
  `${key} delete Player Comment Success`,
);

export const deletePlayerCommentFailure = createAction(
  `${key} delete Player Comment Failure`,
  props<{ error: any }>(),
);

export const loadPlayerById = createAction(
  `${key} load Player By Id`,
  props<{ id: string }>(),
);

export const loadPlayerByIdSuccess = createAction(
  `${key} load Player By Id Success`,
  props<{ player: Player }>(),
);

export const loadPlayerByIdFailure = createAction(
  `${key} load Player By Id Failure`,
  props<{ error: any }>()
);

export const resetPlayer = createAction(
  `${key} reset Player`,
);