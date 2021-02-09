import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { SeasonService } from '../../../services/season.service';
import { SeasonActions } from '../../actions';

@Injectable()
export class SeasonEffects {
  constructor(
    private actions$: Actions,
    private seasonService: SeasonService
  ) {}

  getTeamsByTeamId = createEffect(() =>
    this.actions$.pipe(
      ofType(SeasonActions.loadSeasonsByTeamId),
      switchMap(({ teamId }) =>
        this.seasonService.getSeasonsByTeamId(teamId).pipe(
          map((seasons) =>
            SeasonActions.loadSeasonsByTeamIdSuccess({ seasons })
          ),
          catchError((error) =>
            of(SeasonActions.loadSeasonsByTeamIdFailure({ error }))
          )
        )
      )
    )
  );
}
