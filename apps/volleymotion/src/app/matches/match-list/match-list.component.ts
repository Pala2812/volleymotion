import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Match } from '@volleymotion/models';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatchActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import { MatchSelectors, SeasonSelectors } from '../../core/store/selectors';

@Component({
  selector: 'vm-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss'],
})
export class MatchListComponent implements OnInit {
  isLoadingMatches$: Observable<boolean>;
  matches$: Observable<Match[]>;

  constructor(private store: Store<StoreState>) {}

  ngOnInit(): void {
    this.matches$ = this.store.pipe(select(MatchSelectors.selectMatches));
    this.isLoadingMatches$ = this.store.pipe(select(MatchSelectors.selectIsLoadingMatches));
    this.loadMatches();
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
    this.store.dispatch(MatchActions.setMatch({match}));
  }
}
