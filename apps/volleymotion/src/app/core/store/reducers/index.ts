import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../../../environments/environment';
import * as fromAuth from './auth/auth.reducer';
import * as fromUsers from './user/user.reducer';
import * as fromSurvey from './survey/survey.reducer';
import { AuthActions } from '../actions';

export interface StoreState {
  [fromAuth.authFeatureKey]: fromAuth.State;
  [fromUsers.userFeatureKey]: fromUsers.State;
  [fromSurvey.surveyFeatureKey]: fromSurvey.State;
}

export const reducers: ActionReducerMap<StoreState> = {
  [fromAuth.authFeatureKey]: fromAuth.reducer,
  [fromUsers.userFeatureKey]: fromUsers.reducer,
  [fromSurvey.surveyFeatureKey]: fromSurvey.reducer,
};

export const metaReducers: MetaReducer<StoreState>[] = !environment.production
  ? [logoutClearState]
  : [logoutClearState];

export function logoutClearState(reducer) {
  return function (state, action) {
    if (action.type === AuthActions.signOut) {
      state = undefined;
    }
    return reducer(state, action);
  };
}
