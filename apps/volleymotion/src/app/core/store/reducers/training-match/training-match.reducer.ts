import { Action, createReducer, on } from '@ngrx/store';
import { TrainingMatch } from '@volleymotion/models';
import { TraningMatchActions } from '../../actions';

export const trainingMatchFeatureKey = 'trainingMatch';

export interface State {
  isCreatingTrainingMatch: boolean;
  isLoadingTrainingMatches: boolean;
  trainingMatches: TrainingMatch[];
  trainingMatch: TrainingMatch;
}

export const initialState: State = {
  isCreatingTrainingMatch: false,
  isLoadingTrainingMatches: false,
  trainingMatches: [],
  trainingMatch: undefined,
};

export const reducer = createReducer(
  initialState,
  on(TraningMatchActions.createTrainingMatch, (state) => ({
    ...state,
    isCreatingTrainingMatch: true,
  })),
  on(
    TraningMatchActions.createTrainingMatchSuccess,
    TraningMatchActions.createTrainingMatchFailure,
    (state) => ({ ...state, isCreatingTrainingMatch: false })
  ),

  on(TraningMatchActions.loadTrainingMatches, (state) => ({...state, isLoadingTrainingMatches: true})),
  on(TraningMatchActions.loadTrainingMatchesSuccess, (state, {trainingMatches}) => ({...state, trainingMatches, isLoadingTrainingMatches: false})),
  on(TraningMatchActions.loadTrainingMatchesFailure, (state) => ({...state, isLoadingTrainingMatches: false}))
);
