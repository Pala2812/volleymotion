import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Season, Team } from '@volleymotion/models';
import { Observable } from 'rxjs';
import { PlayerActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import { SeasonSelectors, TeamSelectors } from '../../core/store/selectors';

@Component({
  selector: 'vm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  team$: Observable<Team>;
  season$: Observable<Season>;
  data = [
    ['Ausstehend', 11],
    ['gewonnen', 2],
    ['verloren', 2],
  ];

  trainData = [
    ['Anwesend', 11],
    ['Abwesend', 2],
  ];

  options = {
    backgroundColor: 'transparent',
    width: window.screen.availWidth * .2,
    height: window.screen.availWidth * .2,
    chartArea: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 50,
    },
    legend: { position: 'bottom', textStyle: { color: '#fff', fontSize: 14 } },
  };
  constructor(private store: Store<StoreState>) {}

  ngOnInit(): void {
    this.team$ = this.store.pipe(select(TeamSelectors.selectTeam));
    this.season$ = this.store.pipe(select(SeasonSelectors.selectSeason));
  }
}
