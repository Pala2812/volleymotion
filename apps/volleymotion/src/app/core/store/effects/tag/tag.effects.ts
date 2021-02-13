import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';

import { TagService } from '../../../services/tag.service';
import { TagActions } from '../../actions';

@Injectable()
export class TagEffects {
  constructor(private actions$: Actions, private tagService: TagService) {}

  loadTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TagActions.loadTags),
      mergeMap(() =>
        this.tagService.loadTags().pipe(
          map((tags) => TagActions.loadTagsSuccess({ tags })),
          catchError((error) => of(TagActions.loadTagsFailure({ error })))
        )
      )
    )
  );

  createTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TagActions.createTag),
      concatMap(({ tag }) =>
        this.tagService.createTag(tag).pipe(
          map(() => TagActions.createTagSuccess()),
          catchError((error) => of(TagActions.createTagFailure({ error })))
        )
      )
    )
  );
}
