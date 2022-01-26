import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  isLoadingPlayers$: Observable<boolean> | undefined;
  players$: Observable<Player[]> | undefined;
  team$: Observable<Team | undefined> | undefined;
  season$: Observable<Season | undefined> | undefined;
  unsubscribe$ = new Subject();

  constructor(private store: Store<StoreState>, private router: Router, private actions$: Actions) { }

  ngOnInit(): void {
    this.isLoadingPlayers$ = this.store.pipe(select(PlayerSelectors.selectIsLoadingPlayers));
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
      .subscribe((res: any) => {
        if (res[0] && res[1]) {
          const team = res[0];
          const season = res[1];
          console.log(team, season);
          this.store.dispatch(PlayerActions.loadPlayers({ teamId: team?.id, seasonId: season?.id }));
        }
      });
  }

  deletePlayer(player: Player, event: Event) {
    this.store.dispatch(PlayerActions.deletePlayer({ player }));
    event.stopImmediatePropagation();
  }

  selectPlayer(player: Player) {
    this.store.dispatch(PlayerActions.setPlayer({ player }));
    this.router.navigate(['spieler/detail', player?.id]);
  }

  editPlayer(player: Player) {
    this.store.dispatch(PlayerActions.setPlayer({ player }));
    this.router.navigate(['spieler/bearbeiten', player?.id]);
  }
}
