import { createReducer, on } from '@ngrx/store';
import { Team } from '@volleymotion/models';
import { TeamActions } from '../../actions';

export const teamFeatureKey = 'team';

export interface State {
  isCreatingTeam: boolean;
  isLoadingTeams: boolean;
  isLoadingTeam: boolean;
  isDeletingTeam: boolean;
  teams: Team[];
  team: Team | undefined;
}

export const initialState: State = {
  isCreatingTeam: false,
  isLoadingTeams: false,
  isLoadingTeam: false,
  isDeletingTeam: false,
  teams: [],
  team: undefined,
};

export const reducer = createReducer(
  initialState,
  on(TeamActions.createTeam, (state) => ({ ...state, isCreatingTeam: true })),
  on(TeamActions.createTeamSuccess, TeamActions.createTeamFailure, (state) => ({
    ...state,
    isCreatingTeam: false,
  })),
  on(TeamActions.loadTeams, (state) => ({ ...state, isLoadingTeams: true })),
  on(TeamActions.loadTeamsSuccess, (state, { teams }) => ({
    ...state,
    teams,
    isLoadingTeams: false,
  })),
  on(TeamActions.loadTeamsFailure, (state) => ({
    ...state,
    isLoadingTeams: false,
  })),
  on(TeamActions.setTeam, (state, { team }) => ({ ...state, team })),
  on(TeamActions.loadTeamById, (state) => ({ ...state, isLoadingTeam: true })),
  on(TeamActions.loadTeamByIdSuccess, (state, { team }) => ({ ...state, team, isLoadingTeam: false })),
  on(TeamActions.loadTeamByIdFailure, (state) => ({ ...state, isLoadingTeam: false })),
  on(TeamActions.deleteTeam, (state) => ({ ...state, isDeletingTeam: true })),
  on(TeamActions.deleteTeamSuccess, TeamActions.deleteTeamFailure, (state) => ({ ...state, isDeletingTeam: false })),

  on(TeamActions.resetTeam, () => initialState)
);
