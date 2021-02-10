import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromMatch from '../../reducers/match/match.reducer';

const selectMatchFeature = createFeatureSelector<fromMatch.State>(
  fromMatch.matchFeatureKey
);

export const selectIsCreatingMatch = createSelector(
  selectMatchFeature,
  (state) => state.isCreatingMatch
);

export const selectIsLoadingMatches = createSelector(
  selectMatchFeature,
  (state) => state.isLoadingMatches
);

export const selectMatches = createSelector(
  selectMatchFeature,
  (state) => state.matches
);

export const selectMatch = createSelector(
  selectMatchFeature,
  (state) => state.match
);
