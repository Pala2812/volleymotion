import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromExercise from '../../reducers/exercise/exercise.reducer';

const selectExerciseFeature = createFeatureSelector<fromExercise.State>(
    fromExercise.exerciseFeatureKey
);

export const selectIsLoadingExercises = createSelector(selectExerciseFeature, (state) => state.isLoadingExercises);
export const selectIsCreatingExercise = createSelector(selectExerciseFeature, (state) => state.isCreatingExercise);
export const selectExercises = createSelector(selectExerciseFeature, (state) => state.exercises);
export const selectExercise = createSelector(selectExerciseFeature, (state) => state.exercise);