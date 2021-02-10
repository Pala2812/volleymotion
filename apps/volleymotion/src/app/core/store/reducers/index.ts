import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../../../environments/environment';
import * as fromAuth from './auth/auth.reducer';
import * as fromUsers from './user/user.reducer';
import * as fromSurvey from './survey/survey.reducer';
import * as fromTeam from './team/team.reducer';
import * as fromSeason from './season/season.reducer';
import * as fromPlayer from './player/player.reducer';
import * as fromMatch from './match/match.reducer';
import * as fromTrainingMatch from './training-match/training-match.reducer';
import { AuthActions } from '../actions';

export interface StoreState {
  [fromAuth.authFeatureKey]: fromAuth.State;
  [fromUsers.userFeatureKey]: fromUsers.State;
  [fromSurvey.surveyFeatureKey]: fromSurvey.State;
  [fromTeam.teamFeatureKey]: fromTeam.State;
  [fromSeason.seasonFeatureKey]: fromSeason.State;
  [fromPlayer.playerFeatureKey]: fromPlayer.State;
  [fromMatch.matchFeatureKey]: fromMatch.State;
  [fromTrainingMatch.trainingMatchFeatureKey]: fromTrainingMatch.State;
}

export const reducers: ActionReducerMap<StoreState> = {
  [fromAuth.authFeatureKey]: fromAuth.reducer,
  [fromUsers.userFeatureKey]: fromUsers.reducer,
  [fromSurvey.surveyFeatureKey]: fromSurvey.reducer,
  [fromTeam.teamFeatureKey]: fromTeam.reducer,
  [fromSeason.seasonFeatureKey]: fromSeason.reducer,
  [fromPlayer.playerFeatureKey]: fromPlayer.reducer,
  [fromMatch.matchFeatureKey]: fromMatch.reducer,
  [fromTrainingMatch.trainingMatchFeatureKey]: fromTrainingMatch.reducer,
};

export const metaReducers: MetaReducer<StoreState>[] = !environment.production
  ? [logoutClearState]
  : [logoutClearState];

export function logoutClearState(reducer) {
  return function (state, action) {
    if (action.type === AuthActions.signOut().type) {
      console.log('reset');
      state = undefined;
    }
    return reducer(state, action);
  };
}
