import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTrainingMatch from '../../reducers/training-match/training-match.reducer';

const selectTrainingMatchFeature = createFeatureSelector<
  fromTrainingMatch.State
>(fromTrainingMatch.trainingMatchFeatureKey);

export const selectIsCreatingTrainingMatch = createSelector(
  selectTrainingMatchFeature,
  (state) => state.isCreatingTrainingMatch
);

export const selectIsLoadingTrainingMatches = createSelector(
  selectTrainingMatchFeature,
  (state) => state.isLoadingTrainingMatches
);

export const selectTrainingMatches = createSelector(
  selectTrainingMatchFeature,
  (state) => state.trainingMatches
);

export const selectTrainingMatch = createSelector(
  selectTrainingMatchFeature,
  (state) => state.trainingMatch
);
