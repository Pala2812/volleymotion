import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { TeamService } from '../../../services/team.service';
import { TeamActions } from '../../actions';

@Injectable()
export class TeamEffects {
  constructor(private actions$: Actions, private teamService: TeamService) {}

  createTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamActions.createTeam),
      switchMap(({ team }) =>
        this.teamService.createOrUpdateTeam(team).pipe(
          map(() => TeamActions.createTeamSuccess()),
          catchError((error) => of(TeamActions.createTeamFailure({ error })))
        )
      )
    )
  );

  loadTeams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamActions.loadTeams),
      mergeMap(({ uid }) =>
        this.teamService.loadTeams(uid).pipe(
          map((teams) => TeamActions.loadTeamsSuccess({ teams })),
          catchError((error) => of(TeamActions.loadTeamsFailure({ error })))
        )
      )
    )
  );

  loadTeamById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamActions.loadTeamById),
      switchMap(({ id }) =>
        this.teamService.loadTeamById(id).pipe(
          map((team) => TeamActions.loadTeamByIdSuccess({ team })),
          catchError((error) => of(TeamActions.loadTeamByIdFailure({ error })))
        )
      )
    )
  );
  
}
