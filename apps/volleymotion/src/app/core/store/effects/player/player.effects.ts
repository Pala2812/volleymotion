import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PlayerService } from '../../../services/player.service';
import { PlayerActions } from '../../actions';

@Injectable()
export class PlayerEffects {

  constructor(
    private actions$: Actions,
    private playerService: PlayerService
  ) {}

  createPlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.createPlayer),
      switchMap(({ player }) =>
        this.playerService.addOrUpdatePlayer(player).pipe(
          map(() => PlayerActions.createPlayerSuccess()),
          catchError((error) =>
            of(PlayerActions.createPlayerFailure({ error }))
          )
        )
      )
    )
  );

  loadPlayersByTeamId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.loadPlayersByTeamId),
      switchMap(({ teamId }) =>
        this.playerService.loadPlayersByTeamId(teamId).pipe(
          map((players) =>
            PlayerActions.loadPlayersByTeamIdSuccess({ players })
          ),
          catchError((error) =>
            of(PlayerActions.loadPlayersByTeamIdFailure({ error }))
          )
        )
      )
    )
  );

  deletePlayer$ = createEffect(() => this.actions$.pipe(
    ofType(PlayerActions.deletePlayer),
    switchMap(({player}) => this.playerService.deletePlayer(player).pipe(
      map(() => PlayerActions.deletePlayerSuccess()),
      catchError(error => of(PlayerActions.deletePlayerFailure({error})))
    ))
  ))
}
