import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

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
        this.seasonService.loadSeasonsByTeamId(teamId).pipe(
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

  updateSeason$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SeasonActions.updateSeason),
      switchMap(({ season }) =>
        this.seasonService.updateSeason(season).pipe(
          map(() => SeasonActions.updateSeasonSuccess()),
          catchError((error) =>
            of(SeasonActions.updateSeasonFailure({ error }))
          )
        )
      )
    )
  );

  loadSeasonById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SeasonActions.loadSeasonById),
      switchMap(({ id }) =>
        this.seasonService.loadSeasonById(id).pipe(
          map((season) => SeasonActions.loadSeasonByIdSuccess({ season })),
          catchError((error) =>
            of(SeasonActions.loadSeasonByIdFailure({ error }))
          )
        )
      )
    )
  );

  setSeason = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SeasonActions.setSeason),
        filter(season => !!season),
        tap(({ season }) => {
          localStorage.setItem('seasonId', season.id);
        })
      ),
    { dispatch: false }
  );
}
