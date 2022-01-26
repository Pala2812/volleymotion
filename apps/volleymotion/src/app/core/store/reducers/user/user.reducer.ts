import { createReducer, on } from '@ngrx/store';

import { User } from '../../../models';
import { UserActions } from '../../actions';

export const userFeatureKey = 'user';

export interface State {
  isUpdatingUser: boolean;
  user: User | undefined;
}

export const initialState: State = {
  isUpdatingUser: false,
  user: undefined,
};

export const reducer = createReducer(
  initialState,
  on(UserActions.UpdateUser, (state) => ({ ...state, isUpdatingUser: true })),
  on(UserActions.UpdateUserSuccess, (state, { user }) => ({
    ...state,
    user,
    isUpdatingUser: false,
  })),
  on(UserActions.UpdateUserFailure, (state) => ({
    ...state,
    isUpdatingUser: false,
  })),
  on(UserActions.setUser, (state, { user }) => ({ ...state, user }))
);
