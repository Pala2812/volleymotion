import { createAction, props } from '@ngrx/store';
import { User } from '../../../models';

const key = '[Auth]';

export const CreateUserWithEmailAndPassword = createAction(
  `${key} Create User With Email And Password`,
  props<{ email: string; password: string; user: Partial<User>}>()
);

export const CreateUserWithEmailAndPasswordSuccess = createAction(
  `${key} Create User With Email And Password Success`,
  props<{ uid: string }>()
);

export const CreateUserWithEmaiAndPasswordFailure = createAction(
  `${key} Create User With Email And Password Failure`,
  props<{ error: any }>()
);

export const SignInWithEmailAndPassword = createAction(
  `${key} Sign In With Email And Password`,
  props<{ email: string; password: string }>()
);

export const SignInWithEMailAndPasswordSuccess = createAction(
  `${key} Sign In With Email And Password Success`,
  props<{ uid: string }>()
);

export const SignInWithEmailAndPasswordFailure = createAction(
  `${key} Sign In With Email and Password Failure`,
  props<{ error: any }>()
);

export const setUid = createAction(`${key} Set Uid`, props<{ uid: string }>());

export const signOut = createAction(`${key} Sign Out`);
