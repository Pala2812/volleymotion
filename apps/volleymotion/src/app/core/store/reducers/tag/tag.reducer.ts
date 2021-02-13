import { Action, createReducer, on } from '@ngrx/store';
import { Tag } from '@volleymotion/models';
import { TagActions } from '../../actions';


export const tagFeatureKey = 'tag';

export interface State {
  isLoadingTags: boolean;
  tags: Tag[];
}

export const initialState: State = {
  isLoadingTags: false,
  tags: []
};


export const reducer = createReducer(
  initialState,
  on(TagActions.loadTags, (state) => ({...state, isLoadingTags: true})),
  on(TagActions.loadTagsSuccess, (state, {tags}) => ({...state, tags, isLoadingTags: false})),
  on(TagActions.loadTagsFailure, (state) => ({...state, isLoadingTags: false}))
);

