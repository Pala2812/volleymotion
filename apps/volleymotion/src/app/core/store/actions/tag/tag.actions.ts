import { createAction, props } from '@ngrx/store';
import { Tag } from '@volleymotion/models';

const key = '[Tag]';

export const loadTags = createAction(`${key} Load Tags`);

export const loadTagsSuccess = createAction(
  `${key} Load Tags Success`,
  props<{ tags: Tag[] }>()
);

export const loadTagsFailure = createAction(
  `${key} Load Tags Failure`,
  props<{ error: any }>()
);

export const createTag = createAction(
  `${key} Create Tag Success`,
  props<{ tag: Tag }>()
);

export const createTagSuccess = createAction(`${key} Create Tag Success`);

export const createTagFailure = createAction(
  `${key} Create Tag Failure`,
  props<{ error: any }>()
);
