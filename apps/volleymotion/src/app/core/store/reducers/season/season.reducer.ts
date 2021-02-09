import { createReducer, on } from '@ngrx/store';
import { Season } from '@volleymotion/models';
import { SeasonActions } from '../../actions';

export const seasonFeatureKey = 'season';

export interface State {
  isLoadingSeasons: boolean;
  seasons: Season[];
  season: Season;
}

export const initialState: State = {
  isLoadingSeasons: false,
  seasons: [],
  season: undefined,
};

export const reducer = createReducer(
  initialState,
  on(SeasonActions.loadSeasonsByTeamId, (state) => ({
    ...state,
    isLoadingSeasons: true,
  })),
  on(SeasonActions.loadSeasonsByTeamIdSuccess, (state, { seasons }) => ({
    ...state,
    seasons,
    isLoadingSeasons: false,
  })),
  on(SeasonActions.loadSeasonsByTeamIdFailure, (state) => ({
    ...state,
    isLoadingSeasons: false,
  }))
);
