import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Team } from '@volleymotion/models';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { TeamActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import { TeamSelectors, UserSelectors } from '../../core/store/selectors';

@Component({
  selector: 'vm-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
})
export class TeamListComponent implements OnInit {
  isLoadingTeams$: Observable<Boolean>;
  teams$: Observable<Team[]>;

  constructor(private store: Store<StoreState>) {}

  ngOnInit(): void {
    this.isLoadingTeams$ = this.store.pipe(
      select(TeamSelectors.selectIsLoadingTeam)
    );
    this.teams$ = this.store.pipe(select(TeamSelectors.selectTeams));
    this.store
      .pipe(
        select(UserSelectors.selectUser),
        filter((user) => !!user)
      )
      .subscribe((user) => {
        console.log(user);
        this.store.dispatch(TeamActions.loadTeams({ uid: user?.uid }));
      });
  }

  selectTeam(team: Team) {
    this.store.dispatch(TeamActions.setTeam({ team }));
  }
}
