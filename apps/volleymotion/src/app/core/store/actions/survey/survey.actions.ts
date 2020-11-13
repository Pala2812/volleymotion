import { createAction, props } from '@ngrx/store';
import { Survey, SurveyComment } from '../../../models';

const key = '[Survey]';

export const loadSurveys = createAction(`${key} Load Surveys`);

export const loadSurveysSuccess = createAction(
  `${key} Load Surveys Success`,
  props<{ surveys: Survey[] }>()
);

export const loadSurveysFailure = createAction(
  `${key} Load Surveys Failure`,
  props<{ error: any }>()
);

export const loadSurveyById = createAction(
  `${key} Load Survey By Id`,
  props<{ id: string }>()
);

export const loadSurveyByIdSuccess = createAction(
  `${key} Load Survey By Id Success`,
  props<{ survey: Survey }>()
);

export const loadSurveyByIdFailure = createAction(
  `${key} Load Survey By Id Failure`,
  props<{ error: any }>()
);

export const createSurvey = createAction(
  `${key} Create Survey`,
  props<{ survey: Survey }>()
);

export const createSurveySuccess = createAction(`${key} Create Survey Success`);

export const createSurveyFailure = createAction(
  `${key} Create Survey Failure`,
  props<{ error: any }>()
);

export const updateSurvey = createAction(
  `${key} Update Survey`,
  props<{ survey: Survey }>()
);

export const updateSurveySuccess = createAction(`${key} Update Survey Success`);

export const updateSurveyFailure = createAction(
  `${key} Update Survey Failure`,
  props<{ error: any }>()
);

export const likeSurvey = createAction(
  `${key} Like Survey`,
  props<{ id: string }>()
);
export const likeSurveySuccess = createAction(`${key} Like Survey Success`);
export const likeSurveyFailure = createAction(
  `${key} Like Survey Failure`,
  props<{ error: any }>()
);

export const addCommentToSurvey = createAction(
  `${key} Add Comment To Survey`,
  props<{ message: SurveyComment }>()
);
export const addCommentToSurveySuccess = createAction(
  `${key} Add Comment To Survey Success`
);
export const addCommentToSurveyFailure = createAction(
  `${key} Add Comment To Survey Failure`,
  props<{ error: any }>()
);

export const loadCommentsOfSurvey = createAction(
  `${key} Load Comments Of Survey`,
  props<{ id: string }>()
);

export const loadCommentsOfSurveySuccess = createAction(
  `${key} Load Comments Of Survey Success`,
  props<{ surveyComments: SurveyComment[] }>()
);

export const loadCommentsOfSurveyFailure = createAction(
  `${key} Load Comments Of Survey Failure`,
  props<{ error: any }>()
);

export const reportSurvey = createAction(
  `${key} Report Survey`,
  props<{ id: string }>()
);

export const reportSurveySuccess = createAction(`${key} Report Survey Success`);

export const reportSurveyFailure = createAction(
  `${key} Report Survey Failure`,
  props<{ error: any }>()
);
