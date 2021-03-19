import { createAction, props } from '@ngrx/store';
import { Match, MatchComment } from '@volleymotion/models';

const key = '[Match]';

export const loadMatches = createAction(
  `${key} Load Matches`,
  props<{ teamId: string; seasonId: string }>()
);

export const loadMatchesSuccess = createAction(
  `${key} Load Matches Success`,
  props<{ matches: Match[] }>()
);

export const loadMatchesFailure = createAction(
  `${key} Load Matches Failure`,
  props<{ error: any }>()
);

export const createMatch = createAction(
  `${key} Crate Match`,
  props<{ match: Partial<Match> }>()
);

export const createMatchSuccess = createAction(
  `${key} Create Match Success`,
);

export const createMatchFailure = createAction(
  `${key} Create Match Failure`,
  props<{ error: any }>()
);

export const setMatch = createAction(
  `${key} Set Match`,
  props<{ match: Match }>()
);

export const addCommentToMatch = createAction(
  `${key} Add Comment To Match`,
  props<{ match: Match, matchComment: MatchComment }>()
);

export const addCommentToMatchSuccess = createAction(
  `${key} Add Comment To Match Success`,
);

export const addCommentToMatchFailure = createAction(
  `${key} Add Comment To Match Failure`,
  props<{ error: any }>(),
);

export const loadMatchComments = createAction(
  `${key} Load Match Comments`,
  props<{ match: Match }>()
);

export const loadMatchCommentsSuccess = createAction(
  `${key} Load Match Comments Success`,
  props<{ matchComments: MatchComment[] }>()
);

export const loadMatchCommentsFailure = createAction(
  `${key} Load Match Comments Failure`,
  props<{ error: any }>()
);

export const deleteMatchComment = createAction(
  `${key} delete Match Comment`,
  props<{ matchComment: MatchComment }>()
);

export const deleteMatchCommentSuccess = createAction(
  `${key} delete Match Comment Success`
);

export const deleteMatchCommentFailure = createAction(
  `${key} delete Match Comment Failure`,
  props<{ error: any }>()
);

export const loadMatchById = createAction(
  `${key} load Match By Id`,
  props<{ id: string }>(),
);

export const loadMatchByIdSuccess = createAction(
  `${key} load Match By Id Success`,
  props<{ match: Match }>(),
);

export const loadMatchByIdFailure = createAction(
  `${key} load Match By Id Failure`,
  props<{ error: any }>(),
);