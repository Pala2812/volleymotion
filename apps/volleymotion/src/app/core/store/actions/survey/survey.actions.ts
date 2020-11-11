import { createAction, props } from '@ngrx/store';
import { Survey } from '../../../models';

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

export const likeSurvey = createAction(
  `${key} Like Survey`,
  props<{ id: string }>()
);
export const likeSurveySuccess = createAction(`${key} Like Survey Success`);
export const likeSurveyFailure = createAction(
  `${key} Like Survey Failure`,
  props<{ error: any }>()
);
