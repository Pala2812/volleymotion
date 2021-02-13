import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Season, Team } from '@volleymotion/models';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { SeasonActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import { SeasonSelectors, TeamSelectors } from '../../core/store/selectors';

@Component({
  selector: 'vm-season-list',
  templateUrl: './season-list.component.html',
  styleUrls: ['./season-list.component.scss'],
})
export class SeasonListComponent implements OnInit {
  isLoadingSeasons$: Observable<boolean>;
  seasons$: Observable<Season[]>;
  team$: Observable<Team>;
  unsubscribe$ = new Subject();

  constructor(
    private store: Store<StoreState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoadingSeasons$ = this.store.pipe(
      select(SeasonSelectors.selectIsLoadingSeasons)
    );

    this.team$ = this.store.pipe(select(TeamSelectors.selectTeam));

    this.seasons$ = this.store.pipe(
      select(SeasonSelectors.selectSeasons),
      map((seasons) =>
        [...seasons].sort((a, b) => b?.name?.localeCompare(a?.name))
      )
    );

    this.team$.pipe(filter(team => !!team), takeUntil(this.unsubscribe$)).subscribe((team) => {
      const teamId = team.id;
      this.store.dispatch(SeasonActions.loadSeasonsByTeamId({ teamId }));
    });
  }

  selectSeason(season: Season) {
    this.store.dispatch(SeasonActions.setSeason({ season }));
    this.router.navigate(['']);
  }
}
