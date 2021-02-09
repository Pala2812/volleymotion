import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPlayer from '../../reducers/player/player.reducer';

const selectPlayerFeature = createFeatureSelector<fromPlayer.State>(
  fromPlayer.playerFeatureKey
);

export const selectPlayers = createSelector(
  selectPlayerFeature,
  (state) => state.players
);

export const selectIsLoadingPlayers = createSelector(
    selectPlayerFeature,
    (state) => state.isLoadingPlayers
  );