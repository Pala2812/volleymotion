import { createReducer, on } from '@ngrx/store';

import { Survey, SurveyComment } from '../../../models';
import { SurveyActions } from '../../actions';

export const surveyFeatureKey = 'survey';

export interface State {
  isLoadingSurvey: boolean;
  isCreatingSurvey: boolean;
  isUpdatingSurvey: boolean;
  isLoadingSurveys: boolean;
  isLikingSurvey: boolean;
  isReportingSurvey: boolean;
  isLoadingSurveyComments: boolean;
  surveys: Survey[];
  survey: Survey;
  surveyComments: SurveyComment[];
}

export const initialState: State = {
  isLoadingSurvey: false,
  isCreatingSurvey: false,
  isUpdatingSurvey: false,
  isLoadingSurveys: false,
  isReportingSurvey: false,
  isLikingSurvey: false,
  isLoadingSurveyComments: false,
  surveys: [],
  survey: undefined,
  surveyComments: [],
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

  on(SurveyActions.updateSurvey, (state) => ({
    ...state,
    isLoadingSurveys: true,
  })),
  on(
    SurveyActions.updateSurveySuccess,
    SurveyActions.updateSurveyFailure,
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
  ),

  on(SurveyActions.loadCommentsOfSurvey, (state) => ({
    ...state,
    isLoadingSurveyComments: true,
  })),
  on(
    SurveyActions.loadCommentsOfSurveySuccess,
    (state, { surveyComments }) => ({
      ...state,
      surveyComments,
      isLoadingSurveyComments: false,
    })
  ),
  on(SurveyActions.loadCommentsOfSurveyFailure, (state) => ({
    ...state,
    isLoadingSurveyComments: false,
  })),

  on(SurveyActions.reportSurvey, (state) => ({
    ...state,
    isReportingSurvey: true,
  })),
  on(
    SurveyActions.reportSurveySuccess,
    SurveyActions.reportSurveyFailure,
    (state) => ({
      ...state,
      isReportingSurvey: false,
    })
  )
);
