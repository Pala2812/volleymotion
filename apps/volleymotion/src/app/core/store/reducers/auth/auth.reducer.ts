import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../../actions';

export const authFeatureKey = 'auth';

export interface State {
  isCreatingUserWithEMailAndPassword: boolean;
  isSigningInWithEMailAndPassword: boolean;
  uid: string | undefined;
}

export const initialState: State = {
  isCreatingUserWithEMailAndPassword: false,
  isSigningInWithEMailAndPassword: false,
  uid: undefined,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.CreateUserWithEmailAndPassword, (state) => ({
    ...state,
    isCreatingUserWithEMailAndPassword: true,
  })),
  on(AuthActions.CreateUserWithEmailAndPasswordSuccess, (state, { uid }) => ({
    ...state,
    uid,
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
  on(AuthActions.SignInWithEMailAndPasswordSuccess, (state, { uid }) => ({
    ...state,
    uid,
    isSigningInWithEMailAndPassword: false,
  })),
  on(AuthActions.SignInWithEmailAndPasswordFailure, (state) => ({
    ...state,
    isSigningInWithEMailAndPassword: false,
  })),

  on(AuthActions.setUid, (state, { uid }) => ({ ...state, uid }))
);
