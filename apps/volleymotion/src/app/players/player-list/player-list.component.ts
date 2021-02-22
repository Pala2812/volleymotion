import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Player, Season, Team } from '@volleymotion/models';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, takeUntil, withLatestFrom } from 'rxjs/operators';
import { PlayerActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import {
  PlayerSelectors,
  SeasonSelectors,
  TeamSelectors,
} from '../../core/store/selectors';

@Component({
  selector: 'vm-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit, OnDestroy {
  isLoadingPlayers$: Observable<Player[]>;
  players$: Observable<Player[]>;
  team$: Observable<Team>;
  season$: Observable<Season>;
  unsubscribe$ = new Subject();

  constructor(private store: Store<StoreState>, private actions$: Actions) {}

  ngOnInit(): void {
    this.isLoadingPlayers$ = this.store.pipe(
      select(PlayerSelectors.selectPlayers)
    );
    this.players$ = this.store.pipe(select(PlayerSelectors.selectPlayers));
    this.season$ = this.store.pipe(select(SeasonSelectors.selectSeason));
    this.team$ = this.store.pipe(select(TeamSelectors.selectTeam));

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
    combineLatest([this.team$, this.season$]).pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        const team = res[0];
        const season = res[1];
        PlayerActions.loadPlayers({ teamId: team?.id, seasonId: season?.id })
      });
  }

  deletePlayer(player: Player, event: Event) {
    this.store.dispatch(PlayerActions.deletePlayer({ player }));
    event.stopImmediatePropagation();
  }
}
