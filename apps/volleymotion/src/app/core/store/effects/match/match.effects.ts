import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MatchService } from '../../../services/match.service';
import { MatchActions } from '../../actions';

@Injectable()
export class MatchEffects {
  constructor(private actions$: Actions, private matchService: MatchService) {}

  createMatch$ = this.actions$.pipe(
    ofType(MatchActions.createMatch),
    switchMap(({ match }) =>
      this.matchService.addOrUpdateMatch(match).pipe(
        map(() => MatchActions.createMatchSuccess()),
        catchError((error) => of(MatchActions.createMatchFailure({ error })))
      )
    )
  );

  loadMatches$ = this.actions$.pipe(
    ofType(MatchActions.loadMatches),
    switchMap(({ teamId, seasonId }) =>
      this.matchService.loadMatches(teamId, seasonId).pipe(
        map((matches) => MatchActions.loadMatchesSuccess({ matches })),
        catchError((error) => of(MatchActions.loadMatchesFailure({ error })))
      )
    )
  );
}
