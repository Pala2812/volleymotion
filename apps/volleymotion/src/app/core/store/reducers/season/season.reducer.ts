import { createReducer, on } from '@ngrx/store';
import { Season } from '@volleymotion/models';
import { SeasonActions } from '../../actions';

export const seasonFeatureKey = 'season';

export interface State {
  isLoadingSeasons: boolean;
  isLoadingSeason: boolean;
  isUpdatingSeason: boolean;
  seasons: Season[];
  season: Season | undefined;
}

export const initialState: State = {
  isLoadingSeasons: false,
  isLoadingSeason: false,
  isUpdatingSeason: false,
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
  })),

  on(SeasonActions.setSeason, (state, {season}) => ({...state, season})),

  on(SeasonActions.updateSeason, (state) => ({...state, isUpdatingSeason: true})),
  on(SeasonActions.updateSeasonSuccess, (state) => ({...state, isUpdatingSeason: false})),
  on(SeasonActions.updateSeasonFailure, (state) => ({...state, isUpdatingSeason: false})),

  on(SeasonActions.loadSeasonById, (state) => ({...state, isLoadingSeason: true })),
  on(SeasonActions.loadSeasonByIdSuccess, (state, {season}) => ({...state, season, isLoadingSeason: false})),
  on(SeasonActions.loadSeasonByIdFailure, (state)  => ({...state, isLoadingSeason: false}))
);
