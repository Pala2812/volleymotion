import { createAction, props } from '@ngrx/store';
import { User } from '../../../models';

const key = '[User]';

export const UpdateUser = createAction(
  `${key} Update User`,
  props<{ user: User }>()
);

export const UpdateUserSuccess = createAction(
  `${key} Update User Success`,
  props<{ user: User }>()
);

export const UpdateUserFailure = createAction(
  `${key} Update User Failure`,
  props<{ error: Error }>()
);

export const setUser = createAction(`${key} Set User`, props<{ user: User | undefined }>());
