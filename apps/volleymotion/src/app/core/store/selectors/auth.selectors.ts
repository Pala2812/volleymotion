import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth/auth.reducer';

const selectAuth = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectIsCreatingUserWithEMailAndPassword = createSelector(
  selectAuth,
  (state) => state.isCreatingUserWithEMailAndPassword
);

export const selectIsSigningInWithEmailAndPassword = createSelector(
  selectAuth,
  (state) => state.isSigningInWithEMailAndPassword
);

export const selectUid = createSelector(selectAuth, (state) => state.uid);
