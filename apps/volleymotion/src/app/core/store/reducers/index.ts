import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../../../environments/environment';
import * as fromAuth from './auth/auth.reducer';

export interface StoreState {
  [fromAuth.authFeatureKey]: fromAuth.State;
}

export const reducers: ActionReducerMap<StoreState> = {
  [fromAuth.authFeatureKey]: fromAuth.reducer,
};

export const metaReducers: MetaReducer<StoreState>[] = !environment.production
  ? []
  : [];
