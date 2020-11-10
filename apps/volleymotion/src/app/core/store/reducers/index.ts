import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../../../environments/environment';
import * as fromAuth from './auth/auth.reducer';
import * as fromUsers from './user/user.reducer';

export interface StoreState {
  [fromAuth.authFeatureKey]: fromAuth.State;
  [fromUsers.userFeatureKey]: fromUsers.State;
}

export const reducers: ActionReducerMap<StoreState> = {
  [fromAuth.authFeatureKey]: fromAuth.reducer,
  [fromUsers.userFeatureKey]: fromUsers.reducer,
};

export const metaReducers: MetaReducer<StoreState>[] = !environment.production
  ? []
  : [];
