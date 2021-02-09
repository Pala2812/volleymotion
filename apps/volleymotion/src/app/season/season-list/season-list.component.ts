import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Season } from '@volleymotion/models';
import { Observable } from 'rxjs';
import { SeasonActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import { SeasonSelectors } from '../../core/store/selectors';

@Component({
  selector: 'vm-season-list',
  templateUrl: './season-list.component.html',
  styleUrls: ['./season-list.component.scss'],
})
export class SeasonListComponent implements OnInit {
  isLoadingSeasons$: Observable<boolean>;
  seasons$: Observable<Season[]>;
  teamId: string;

  constructor(
    private store: Store<StoreState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoadingSeasons$ = this.store.pipe(
      select(SeasonSelectors.selectIsLoadingSeasons)
    );
    this.seasons$ = this.store.pipe(select(SeasonSelectors.selectSeasons));

    this.route.params.subscribe((params) => {
      const teamId = params.id;
      this.teamId = teamId;
      this.store.dispatch(SeasonActions.loadSeasonsByTeamId({ teamId }));
    });
  }

  selectSeason(season: Season) {
    this.store.dispatch(SeasonActions.setSeason({ season }));
    this.router.navigate(['']);
  }
}
