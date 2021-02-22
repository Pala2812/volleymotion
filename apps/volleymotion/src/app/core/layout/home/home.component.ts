import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService } from '@nebular/theme';
import { select, Store } from '@ngrx/store';
import { Season, Team } from '@volleymotion/models';
import { Observable } from 'rxjs';

import { AuthActions } from '../../store/actions';
import { StoreState } from '../../store/reducers';
import { AuthSelectors, SeasonSelectors, TeamSelectors } from '../../store/selectors';

@Component({
  selector: 'vm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  uid$: Observable<string>;
  sidebarState = 'collapsed';
  season$: Observable<Season>;
  team$: Observable<Team>;
  items = [
    {
      title: 'dashboard',
      link: 'dashboard',
      icon: 'pie-chart-outline',
    },
    {
      title: 'Mannschaften',
      link: 'mannschaften',
      icon: 'people-outline',
    },
    {
      title: 'Saisons',
      link: 'saisons',
      icon: 'activity-outline',
    },
    {
      title: 'Training',
      link: 'training',
      icon: 'list-outline',
    },
    { title: 'Spieltage', link: 'spieltage', icon: 'clipboard-outline' },
    { title: 'Spieler', link: 'spieler', icon: 'person-add-outline' },
    { title: 'Trainingsspiele', link: 'trainingsspiele', icon: 'pin-outline' },
    { title: 'Chat', link: 'chat', icon: 'paper-plane-outline' },
    { title: 'Tags', link: 'tags', icon: 'hash-outline' },
    { title: 'Feedback', link: 'feedback', icon: 'star-outline' },
  ];

  constructor(
    private store: Store<StoreState>,
    private menuService: NbMenuService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.uid$ = this.store.pipe(select(AuthSelectors.selectUid));
    this.team$ = this.store.pipe(select(TeamSelectors.selectTeam));
    this.season$ = this.store.pipe(select(SeasonSelectors.selectSeason));
    this.menuService.onItemClick().subscribe(() => this.toggleMenu());
  }

  toggleMenu() {
    this.sidebarState =
      this.sidebarState === 'collapsed' ? 'expanded' : 'collapsed';
  }

  async logout() {
    this.store.dispatch(AuthActions.signOut());
    this.router.navigate(['login']);
    await localStorage.removeItem('teamId');
    await localStorage.removeItem('seasonId');
  }
}
