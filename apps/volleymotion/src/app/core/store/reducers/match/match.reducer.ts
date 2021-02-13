import {  createReducer, on } from '@ngrx/store';
import { Match } from '@volleymotion/models';
import { MatchActions } from '../../actions';

export const matchFeatureKey = 'match';

export interface State {
  isCreatingMatch: boolean;
  isLoadingMatches: boolean;
  matches: Match[];
  match: Match;
}

export const initialState: State = {
  isCreatingMatch: false,
  isLoadingMatches: false,
  matches: [],
  match: undefined,
};

export const reducer = createReducer(
  initialState,
  on(MatchActions.loadMatches, (state) => ({
    ...state,
    isLoadingMatches: true,
  })),
  on(MatchActions.loadMatchesSuccess, (state, {matches}) => ({...state, matches, isLoadingMatches: false})),
  on(MatchActions.loadMatchesFailure, (state) => ({...state, isLoadingMatches: false})),

  on(MatchActions.createMatch, (state)=> ({...state, isCreatingMatch: true})),
  on(MatchActions.createMatchSuccess, (state) => ({...state, isCreatingMatch: false})),
  on(MatchActions.createMatchFailure, (state)=> ({...state, isCreatingMatch: false})),

  on(MatchActions.setMatch, (state, {match}) => ({...state, match})),
);
