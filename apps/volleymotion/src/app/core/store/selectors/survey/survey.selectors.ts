import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromSurvey from '../../reducers/survey/survey.reducer';

const surveyFeature = createFeatureSelector<fromSurvey.State>(fromSurvey.surveyFeatureKey);

export const selectIsCreatingSurvey = createSelector(surveyFeature, state => state.isCreatingSurvey);
export const selectIsLoadingSurveys = createSelector(surveyFeature, state => state.isLoadingSurveys);
export const selectIsLoadingSurvey = createSelector(surveyFeature, state => state.isLoadingSurvey);
export const selectIsLikingSurvey = createSelector(surveyFeature, state => state.isLikingSurvey);
export const selectSurveys = createSelector(surveyFeature, state => state.surveys);
export const selectSurvey = createSelector(surveyFeature, state => state.survey);