import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Match } from '@volleymotion/models';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { MatchActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import { MatchSelectors, SeasonSelectors } from '../../core/store/selectors';

@Component({
  selector: 'vm-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss'],
})
export class MatchListComponent implements OnInit, OnDestroy {
  isLoadingMatches$: Observable<boolean>;
  matches$: Observable<Match[]>;

  private unsubscribe$ = new Subject();

  constructor(private store: Store<StoreState>, private actions$: Actions) { }

  ngOnInit(): void {
    this.matches$ = this.store.pipe(select(MatchSelectors.selectMatches));
    this.isLoadingMatches$ = this.store.pipe(select(MatchSelectors.selectIsLoadingMatches));
    this.loadMatches();
    this.actions$.pipe(ofType(MatchActions.deleteMatchSuccess), takeUntil(this.unsubscribe$))
      .subscribe(() => this.loadMatches());
      this.matches$.subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadMatches() {
    this.store
      .pipe(select(SeasonSelectors.selectSeason),
        filter(season => !!season))
      .subscribe((season) => {
        const teamId = season.teamId;
        const seasonId = season.id;
        this.store.dispatch(MatchActions.loadMatches({ teamId, seasonId }));
      });
  }

  setMatch(match: Match) {
    this.store.dispatch(MatchActions.setMatch({ match }));
  }


  deleteMatch(match: Match, event: Event) {
    this.store.dispatch(MatchActions.deleteMatch({ match }));
    event.stopImmediatePropagation();
  }
}
