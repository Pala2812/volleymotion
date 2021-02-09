import { createAction, props } from '@ngrx/store';
import { Team } from '@volleymotion/models';

const key = '[Teams]';

export const loadTeams = createAction(
  `${key} Load Teams`,
  props<{ uid: string }>()
);

export const loadTeamsSuccess = createAction(
  `${key} Load Teams Success`,
  props<{ teams: Team[] }>()
);

export const loadTeamsFailure = createAction(
  `${key} Load Teams Failure`,
  props<{ error: any }>()
);

export const createTeam = createAction(
  `${key} Create Team`,
  props<{ team: Team }>()
);

export const createTeamSuccess = createAction(`${key} Create Team Success`);

export const createTeamFailure = createAction(
  `${key} Create Team Failure`,
  props<{ error: any }>()
);

export const setTeam = createAction(`${key} Set Team`, props<{ team: Team }>());

export const loadTeamById = createAction(
  `${key} Load Team By Id`,
  props<{ id: string }>()
);

export const loadTeamByIdSuccess = createAction(
  `${key} Load Team By Id Success`,
  props<{ team: Team }>()
);

export const loadTeamByIdFailure = createAction(
  `${key} Load Team By Id Failure`,
  props<{ error: any }>()
);

export const deleteTeam = createAction(
  `${key} Delete Team`,
  props<{ team: Team }>()
);

export const deleteTeamSuccess = createAction(
  `${key} Delete Team Success`,
);

export const deleteTeamFailure = createAction(
  `${key} Delete Team Failure`,
  props<{ error: Error }>()
);
