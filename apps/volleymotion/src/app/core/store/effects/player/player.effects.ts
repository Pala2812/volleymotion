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
  ) { }

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

  updatePlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.updatePlayer),
      switchMap(({ player }) =>
        this.playerService.addOrUpdatePlayer(player).pipe(
          map(() => PlayerActions.updatePlayerSuccess()),
          catchError((error) =>
            of(PlayerActions.updatePlayerFailure({ error }))
          )
        )
      )
    )
  );

  loadPlayersByTeamId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.loadPlayers),
      switchMap(({ teamId, seasonId }) =>
        this.playerService.loadPlayers(teamId, seasonId).pipe(
          map((players) =>
            PlayerActions.loadPlayersSuccess({ players })
          ),
          catchError((error) =>
            of(PlayerActions.loadPlayersFailure({ error }))
          )
        )
      )
    )
  );

  deletePlayer$ = createEffect(() => this.actions$.pipe(
    ofType(PlayerActions.deletePlayer),
    switchMap(({ player }) => this.playerService.deletePlayer(player).pipe(
      map(() => PlayerActions.deletePlayerSuccess()),
      catchError(error => of(PlayerActions.deletePlayerFailure({ error })))
    ))
  ));

  addCommentToPlayer$ = createEffect(() => this.actions$.pipe(
    ofType(PlayerActions.addCommentToPlayer),
    switchMap(({ playerComment }) => this.playerService.addCommentToPlayer(playerComment).pipe(
      map(() => PlayerActions.addCommentToPlayerSuccess()),
      catchError(error => of(PlayerActions.addCommentToPlayerFailure({ error })))
    ))
  ));

  loadPlayerComments$ = createEffect(() => this.actions$.pipe(
    ofType(PlayerActions.loadPlayerComments),
    switchMap(({ player }) => this.playerService.loadPlayerComments(player).pipe(
      map((playerComments) => PlayerActions.loadPlayerCommentsSuccess({ playerComments })),
      catchError((error) => of(PlayerActions.loadPlayerCommentsFailure({ error })))
    ))
  ));

  deletePlayerComment$ = createEffect(() => this.actions$.pipe(
    ofType(PlayerActions.deletePlayerComment),
    switchMap(({ playerComment }) => this.playerService.deletePlayerComment(playerComment).pipe(
      map(() => PlayerActions.deletePlayerCommentSuccess()),
      catchError((error) => of(PlayerActions.deletePlayerCommentFailure({ error })))
    ))
  ));


  loadPlayerById$ = createEffect(() => this.actions$.pipe(
    ofType(PlayerActions.loadPlayerById),
    switchMap(({ id }) => this.playerService.loadPlayerById(id).pipe(
      map((player) => PlayerActions.loadPlayerByIdSuccess({ player })),
      catchError((error) => of(PlayerActions.loadPlayerByIdFailure({ error })))
    ))
  ))
}
