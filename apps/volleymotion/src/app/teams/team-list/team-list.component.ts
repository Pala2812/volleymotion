import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Team } from '@volleymotion/models';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { MatchActions, PlayerActions, SeasonActions, TeamActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import { TeamSelectors, UserSelectors } from '../../core/store/selectors';
import { DeleteDialogComponent } from '../../shared/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'vm-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
})
export class TeamListComponent implements OnInit, OnDestroy {
  isLoadingTeams$: Observable<Boolean>;
  teams$: Observable<Team[]>;
  unsubscribe$ = new Subject();

  constructor(
    private store: Store<StoreState>,
    private actions$: Actions,
    private router: Router,
    private dialogService: NbDialogService
  ) { }

  ngOnInit(): void {
    this.isLoadingTeams$ = this.store.pipe(
      select(TeamSelectors.selectIsLoadingTeam)
    );

    this.teams$ = this.store.pipe(select(TeamSelectors.selectTeams));

    this.actions$
      .pipe(
        ofType(TeamActions.deleteTeamSuccess),
        tap(() => this.loadTeams()),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();

    this.loadTeams();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadTeams() {
    this.store
      .pipe(
        select(UserSelectors.selectUser),
        filter((user) => !!user)
      )
      .subscribe((user) => {
        this.store.dispatch(TeamActions.loadTeams({ uid: user?.uid }));
      });
  }

  selectTeam(team: Team) {
    this.store.dispatch(SeasonActions.setSeason({ season: undefined }));
    this.store.dispatch(TeamActions.setTeam({ team }));
    this.router.navigate(['saisons', team.id]);
  }

  deleteTeam(team: Team, event: Event) {
    const ref = this.dialogService.open(DeleteDialogComponent, {
      context: {
        title: `${team?.club} ${team?.name} Löschen?`,
        message: `Möchtest du ${team?.club} ${team?.name} wirklich löschen?<br>
        Diese Aktion ist ist unwiderruflich!`,
      },
      autoFocus: false,
    });

    ref.onClose
      .pipe(
        filter((value) => !!value),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.store.dispatch(TeamActions.deleteTeam({ team }));
      });

    event.stopImmediatePropagation();
  }
}
