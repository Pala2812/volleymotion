import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTag from '../../reducers/tag/tag.reducer';

const selectTagFeature = createFeatureSelector<fromTag.State>(
  fromTag.tagFeatureKey
);

export const selectIsLoadingTags = createSelector(
  selectTagFeature,
  (state) => state.isLoadingTags
);

export const selectTags = createSelector(
  selectTagFeature,
  (state) => state.tags
);
