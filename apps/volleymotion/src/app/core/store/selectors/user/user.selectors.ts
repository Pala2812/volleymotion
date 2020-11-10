import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from '../../reducers/user/user.reducer';

const selectUserFeature = createFeatureSelector<fromUser.State>(
  fromUser.userFeatureKey
);

export const selectIsUpdatingUser = createSelector(
  selectUserFeature,
  (state) => state.isUpdatingUser
);

export const selectUser = createSelector(
  selectUserFeature,
  (state) => state.user
);
