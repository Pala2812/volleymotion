import { createReducer, on } from '@ngrx/store';

import { Survey } from '../../../models';
import { SurveyActions } from '../../actions';

export const surveyFeatureKey = 'survey';

export interface State {
  isLoadingSurvey: boolean;
  isCreatingSurvey: boolean;
  isLoadingSurveys: boolean;
  isLikingSurvey: boolean;
  surveys: Survey[];
  survey: Survey;
}

export const initialState: State = {
  isLoadingSurvey: false,
  isCreatingSurvey: false,
  isLoadingSurveys: false,
  isLikingSurvey: false,
  surveys: [],
  survey: undefined,
};

export const reducer = createReducer(
  initialState,
  on(SurveyActions.createSurvey, (state) => ({
    ...state,
    isLoadingSurveys: true,
  })),
  on(
    SurveyActions.createSurveySuccess,
    SurveyActions.createSurveyFailure,
    (state) => ({
      ...state,
      isLoadingSurveys: false,
    })
  ),

  on(SurveyActions.loadSurveys, (state) => ({
    ...state,
    isLoadingSurveys: true,
  })),
  on(SurveyActions.loadSurveysSuccess, (state, { surveys }) => ({
    ...state,
    surveys,
    isLoadingSurveys: false,
  })),
  on(SurveyActions.loadSurveysFailure, (state) => ({
    ...state,
    isLoadingSurveys: false,
  })),

  on(SurveyActions.loadSurveyById, (state) => ({
    ...state,
    isLoadingSurveys: true,
  })),
  on(SurveyActions.loadSurveyByIdSuccess, (state, { survey }) => ({
    ...state,
    survey,
    isLoadingSurveys: false,
  })),
  on(SurveyActions.loadSurveyByIdFailure, (state) => ({
    ...state,
    isLoadingSurveys: false,
  })),

  on(SurveyActions.likeSurvey, (state) => ({
    ...state,
    isLikingSurvey: true,
  })),
  on(
    SurveyActions.likeSurveySuccess,
    SurveyActions.loadSurveyByIdFailure,
    (state) => ({
      ...state,
      isLoadingSurvey: false,
    })
  )
);
