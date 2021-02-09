import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Player } from '@volleymotion/models';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { PlayerActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import { PlayerSelectors, TeamSelectors } from '../../core/store/selectors';

@Component({
  selector: 'vm-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit, OnDestroy {
  isLoadingPlayers$: Observable<Player[]>;
  players$: Observable<Player[]>;
  unsubscribe$ = new Subject();

  constructor(private store: Store<StoreState>, private actions$: Actions) {}

  ngOnInit(): void {
    this.isLoadingPlayers$ = this.store.pipe(
      select(PlayerSelectors.selectPlayers)
    );
    this.players$ = this.store.pipe(select(PlayerSelectors.selectPlayers));

    this.actions$
      .pipe(
        ofType(PlayerActions.deletePlayerSuccess),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => this.loadPlayers());

    this.loadPlayers();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadPlayers() {
    this.store
      .pipe(select(TeamSelectors.selectTeam), takeUntil(this.unsubscribe$))
      .subscribe((team) => {
        this.store.dispatch(
          PlayerActions.loadPlayersByTeamId({ teamId: team?.id })
        );
      });
  }

  deletePlayer(player: Player, event: Event) {
    this.store.dispatch(PlayerActions.deletePlayer({ player }));
    event.stopImmediatePropagation();
  }
}
