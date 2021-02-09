import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Player } from '@volleymotion/models';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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

  constructor(private store: Store<StoreState>) {}

  ngOnInit(): void {
    this.isLoadingPlayers$ = this.store.pipe(select(PlayerSelectors.selectPlayers));
    this.players$ = this.store.pipe(select(PlayerSelectors.selectPlayers));
    
    this.store.pipe(select(TeamSelectors.selectTeam), takeUntil(this.unsubscribe$))
      .subscribe(team => {
        console.log(team);
        this.store.dispatch(PlayerActions.loadPlayersByTeamId({teamId: team.id}));
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
