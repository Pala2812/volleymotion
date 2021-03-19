import { Action, createReducer, on } from '@ngrx/store';
import { Player, PlayerComment } from '@volleymotion/models';
import { PlayerActions } from '../../actions';

export const playerFeatureKey = 'player';

export interface State {
  isCreatingPlayer: boolean;
  isUpdatingPlayer: boolean;
  isLoadingPlayers: boolean;
  isLoadingPlayer: boolean;
  isLoadingPlayerComments: boolean;
  isAddingCommentToPlayer: boolean;
  playerComments: PlayerComment[];
  players: Player[];
  player: Player;
}

export const initialState: State = {
  isCreatingPlayer: false,
  isUpdatingPlayer: false,
  isLoadingPlayers: false,
  isLoadingPlayer: false,
  isLoadingPlayerComments: false,
  isAddingCommentToPlayer: false,
  playerComments: [],
  players: [],
  player: undefined,
};

export const reducer = createReducer(initialState,
  on(PlayerActions.createPlayer, (state) => ({ ...state, isCreatingPlayer: true })),
  on(PlayerActions.createPlayerSuccess, (state) => ({ ...state, isCreatingPlayer: false })),
  on(PlayerActions.createPlayerFailure, (state) => ({ ...state, isCreatingPlayer: false })),

  on(PlayerActions.loadPlayers, (state) => ({ ...state, isLoadingPlayers: true })),
  on(PlayerActions.loadPlayersSuccess, (state, { players }) => ({ ...state, players, isLoadingPlayers: false })),
  on(PlayerActions.loadPlayersFailure, (state) => ({ ...state, isLoadingPlayers: false })),

  on(PlayerActions.updatePlayer, (state) => ({ ...state, isUpdatingPlayer: true })),
  on(PlayerActions.updatePlayerSuccess, PlayerActions.updatePlayerFailure, (state) => ({ ...state, isUpdatingPlayer: false })),

  on(PlayerActions.setPlayer, (state, { player }) => ({ ...state, player })),

  on(PlayerActions.addCommentToPlayer, (state) => ({ ...state, isAddingCommentToPlayer: true })),
  on(PlayerActions.addCommentToPlayerFailure, PlayerActions.addCommentToPlayerSuccess, (state) => ({ ...state, isAddingCommentToPlayer: false })),

  on(PlayerActions.loadPlayerComments, (state) => ({ ...state, isLoadingPlayerComments: true })),
  on(PlayerActions.loadPlayerCommentsSuccess, (state, { playerComments }) => ({ ...state, playerComments, isLoadingPlayerComments: false })),
  on(PlayerActions.loadPlayerCommentsFailure, (state) => ({ ...state, isLoadingPlayerComments: false })),

  on(PlayerActions.loadPlayerById, (state) => ({ ...state, isLoadingPlayer: true })),
  on(PlayerActions.loadPlayerByIdSuccess, (state, { player }) => ({ ...state, player, isLoadingPlayer: false })),
  on(PlayerActions.loadPlayerByIdFailure, (state) => ({ ...state, isLoadingPlayer: false })),
);
