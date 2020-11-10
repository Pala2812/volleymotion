import { createReducer, on } from '@ngrx/store';
import { User } from '../../../models';
import { AuthActions } from '../../actions';

export const authFeatureKey = 'auth';

export interface State {
  isCreatingUserWithEMailAndPassword: boolean;
  isSigningInWithEMailAndPassword: boolean;
  user: User;
}

export const initialState: State = {
  isCreatingUserWithEMailAndPassword: false,
  isSigningInWithEMailAndPassword: false,
  user: undefined,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.CreateUserWithEmailAndPassword, (state) => ({
    ...state,
    isCreatingUserWithEMailAndPassword: true,
  })),
  on(AuthActions.CreateUserWithEmailAndPasswordSuccess, (state, { user }) => ({
    ...state,
    user,
    isCreatingUserWithEMailAndPassword: false,
  })),
  on(AuthActions.CreateUserWithEmaiAndPasswordFailure, (state) => ({
    ...state,
    isCreatingUserWithEMailAndPassword: false,
  })),

  on(AuthActions.SignInWithEmailAndPassword, (state) => ({
    ...state,
    isSigningInWithEMailAndPassword: true,
  })),
  on(AuthActions.SignInWithEMailAndPasswordSuccess, (state, { user }) => ({
    ...state,
    user,
    isSigningInWithEMailAndPassword: false,
  })),
  on(AuthActions.SignInWithEmailAndPasswordFailure, (state) => ({
    ...state,
    isSigningInWithEMailAndPassword: false,
  }))
);
