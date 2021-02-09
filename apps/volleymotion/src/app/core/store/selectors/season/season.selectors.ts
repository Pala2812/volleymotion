import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSeason from '../../reducers/season/season.reducer';

const selectSeasonFeature = createFeatureSelector<fromSeason.State>(
  fromSeason.seasonFeatureKey
);

export const selectIsLoadingSeasons = createSelector(
  selectSeasonFeature,
  (state) => state.isLoadingSeasons
);

export const selectSeasons = createSelector(
  selectSeasonFeature,
  (state) => state.seasons
);

export const selectSeason = createSelector(
  selectSeasonFeature,
  (state) => state.season
);
