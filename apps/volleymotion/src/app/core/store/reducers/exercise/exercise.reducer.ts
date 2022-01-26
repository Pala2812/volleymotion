import { createReducer, on } from '@ngrx/store';
import { Exercise } from '@volleymotion/models';

import { ExerciseActions } from '../../actions';

export const exerciseFeatureKey = 'exercise';

export interface State {
  isCreatingExercise: boolean;
  isLoadingExercises: boolean;
  exercises: Exercise[];
  exercise: Exercise[] | undefined;
}

export const initialState: State = {
  isCreatingExercise: false,
  isLoadingExercises: false,
  exercises: [],
  exercise: undefined,
};

export const reducer = createReducer(
  initialState,
  on(ExerciseActions.loadExercises, (state) => ({ ...state, isLoadingExercises: true })),
  on(ExerciseActions.loadExercisesSuccess, (state, { exercises }) => ({ ...state, exercises, isLoadingExercises: false })),
  on(ExerciseActions.loadExercisesFailure, (state) => ({ ...state, isLoadingExercises: false })),

  on(ExerciseActions.createExercise, (state) => ({ ...state, isCreatingExercise: true })),
  on(ExerciseActions.createExerciseSuccess, (state) => ({ ...state, isCreatingExercise: false })),
  on(ExerciseActions.createExerciseFailure, (state) => ({ ...state, isCreatingExercise: false })),
);

