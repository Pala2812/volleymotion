import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { Match, MatchComment } from '@volleymotion/models';
import { MatchActions } from '../../actions';

export const matchFeatureKey = 'match';

export interface State {
  isLoadingMatch: boolean;
  isCreatingMatch: boolean;
  isLoadingMatches: boolean;
  isAddingCommentToMatch: boolean;
  isLoadingMatchComments: boolean;
  matches: Match[];
  match: Match;
  matchComments: MatchComment[];
}

export const initialState: State = {
  isLoadingMatch: false,
  isCreatingMatch: false,
  isLoadingMatches: false,
  isAddingCommentToMatch: false,
  matches: [],
  match: undefined,
  isLoadingMatchComments: false,
  matchComments: [],
};

export const reducer = createReducer(
  initialState,
  on(MatchActions.loadMatches, (state) => ({
    ...state,
    isLoadingMatches: true,
  })),
  on(MatchActions.loadMatchesSuccess, (state, { matches }) => ({
    ...state,
    matches,
    isLoadingMatches: false,
  })),
  on(MatchActions.loadMatchesFailure, (state) => ({
    ...state,
    isLoadingMatches: false,
  })),

  on(MatchActions.createMatch, (state) => ({
    ...state,
    isCreatingMatch: true,
  })),
  on(MatchActions.createMatchSuccess, (state) => ({
    ...state,
    isCreatingMatch: false,
  })),
  on(MatchActions.createMatchFailure, (state) => ({
    ...state,
    isCreatingMatch: false,
  })),

  on(MatchActions.addCommentToMatch, (state) => ({
    ...state,
    isAddingCommentToMatch: true,
  })),
  on(
    MatchActions.addCommentToMatchSuccess,
    MatchActions.addCommentToMatchFailure,
    (state) => ({ ...state, isAddingCommentToMatch: false })
  ),

  on(MatchActions.loadMatchComments, (state) => ({ ...state, isLoadingMatchComments: true })),
  on(MatchActions.loadMatchCommentsSuccess, (state, { matchComments }) => ({ ...state, matchComments, isLoadingMatchComments: false })),
  on(MatchActions.loadMatchCommentsFailure, (state) => ({ ...state, isLoadingMatchComments: false })),
  on(MatchActions.setMatch, (state, { match }) => ({ ...state, match })),

  on(MatchActions.loadMatchById, (state) => ({ ...state, isLoadingMatch: true })),
  on(MatchActions.loadMatchByIdSuccess, (state, { match }) => ({ ...state, match, isLoadingMatch: false })),
  on(MatchActions.loadMatchByIdFailure, (state) => ({ ...state, isLoadingMatch: false })),

  on(MatchActions.resetMatch, () => initialState)
);
