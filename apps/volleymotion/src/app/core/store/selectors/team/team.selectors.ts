import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTeam from '../../reducers/team/team.reducer';

const selectTeamFeature = createFeatureSelector<fromTeam.State>(
  fromTeam.teamFeatureKey
);

export const selectIsCreatingTeam = createSelector(
  selectTeamFeature,
  (state) => state.isCreatingTeam
);

export const selectIsLoadingTeam = createSelector(
  selectTeamFeature,
  (state) => state.isLoadingTeams
);

export const selectTeams = createSelector(
  selectTeamFeature,
  (state) => state.teams
);

export const selectTeam = createSelector(
  selectTeamFeature,
  (state) => state.team
);

