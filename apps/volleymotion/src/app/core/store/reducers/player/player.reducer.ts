import { Action, createReducer, on } from '@ngrx/store';
import { Player } from '@volleymotion/models';
import { PlayerActions } from '../../actions';

export const playerFeatureKey = 'player';

export interface State {
  isCreatingPlayer: boolean;
  isUpdatingPlayer: boolean;
  isLoadingPlayers: boolean;
  isLoadingPlayer: boolean;
  players: Player[];
  player: Player;
}

export const initialState: State = {
  isCreatingPlayer: false,
  isUpdatingPlayer: false,
  isLoadingPlayers: false,
  isLoadingPlayer: false,
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

  on(PlayerActions.setPlayer, (state, { player }) => ({ ...state, player }))
);
