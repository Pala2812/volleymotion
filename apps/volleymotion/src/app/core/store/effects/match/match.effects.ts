import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { MatchService } from '../../../services/match.service';
import { MatchActions } from '../../actions';

@Injectable()
export class MatchEffects {
  constructor(private actions$: Actions, private toast: NbToastrService, private matchService: MatchService) { }

  createMatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MatchActions.createMatch),
      switchMap(({ match }) =>
        this.matchService.addOrUpdateMatch(match).pipe(
          map(() => MatchActions.createMatchSuccess()),
          catchError((error) => of(MatchActions.createMatchFailure({ error })))
        )
      )
    )
  );

  deleteMatch$ = createEffect(() => this.actions$.pipe(
    ofType(MatchActions.deleteMatch),
    switchMap(({ match }) => this.matchService.deleteMatch(match).pipe(
      map(() => MatchActions.deleteMatchSuccess()),
      catchError(error => of(MatchActions.deleteMatchFailure({ error })))
    ))
  ));

  deleteMatchSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(MatchActions.deleteMatchSuccess),
    tap(() => {
      this.toast.success('Spieltag wurde gelöscht', 'Spieltag löschen');
    })
  ), { dispatch: false });

  updateMatch$ = createEffect(() => this.actions$.pipe(
    ofType(MatchActions.updateMatch),
    switchMap(({ match }) => this.matchService.addOrUpdateMatch(match).pipe(
      map(() => MatchActions.updateMatchSuccess()),
      catchError((error) => of(MatchActions.updateMatchFailure({ error })))
    ))
  ));

  updateMatchSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(MatchActions.updateMatchSuccess),
    tap(() => this.toast.success('Spieltag wurde aktualisiert', 'Spieltag updaten'))
  ), { dispatch: false });

  addCommentToMatch$ = createEffect(() => this.actions$.pipe(
    ofType(MatchActions.addCommentToMatch),
    concatMap(({ match, matchComment }) => this.matchService.addCommentToMatch(match, matchComment).pipe(
      map(() => MatchActions.addCommentToMatchSuccess()),
      catchError((error) => of(MatchActions.addCommentToMatchFailure({ error })))
    ))
  ));

  loadMatchComments$ = createEffect(() => this.actions$.pipe(
    ofType(MatchActions.loadMatchComments),
    switchMap(({ match }) => this.matchService.loadMatchComments(match).pipe(
      map((matchComments) => MatchActions.loadMatchCommentsSuccess({ matchComments })),
      catchError((error) => of(MatchActions.loadMatchCommentsFailure({ error })))
    ))
  ));

  deleteMatchComment$ = createEffect(() => this.actions$.pipe(
    ofType(MatchActions.deleteMatchComment),
    concatMap(({ matchComment }) => this.matchService.deleteMatchComment(matchComment).pipe(
      map(() => MatchActions.deleteMatchCommentSuccess()),
      catchError((error) => of(MatchActions.deleteMatchCommentFailure({ error })))
    ))
  ))

  loadMatches$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MatchActions.loadMatches),
      switchMap(({ teamId, seasonId }) =>
        this.matchService.loadMatches(teamId, seasonId).pipe(
          map((matches) => MatchActions.loadMatchesSuccess({ matches })),
          catchError((error) => of(MatchActions.loadMatchesFailure({ error })))
        )
      )
    )
  );

  loadMatchById$ = createEffect(() => this.actions$.pipe(
    ofType(MatchActions.loadMatchById),
    switchMap(({ id }) => this.matchService.loadMatchById(id).pipe(
      map((match) => MatchActions.loadMatchByIdSuccess({ match })),
      catchError(error => of(MatchActions.loadMatchByIdFailure({ error }))),
    ))
  ));
}
