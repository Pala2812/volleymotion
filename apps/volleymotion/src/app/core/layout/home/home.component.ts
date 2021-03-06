import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService } from '@nebular/theme';
import { select, Store } from '@ngrx/store';
import { Season, Team } from '@volleymotion/models';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthActions } from '../../store/actions';
import { StoreState } from '../../store/reducers';
import {
  AuthSelectors,
  SeasonSelectors,
  TeamSelectors,
} from '../../store/selectors';
import { fullItems, initItems, initItems2 } from './sidebar-items';

@Component({
  selector: 'vm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  uid$: Observable<string | undefined> | undefined;
  sidebarState = 'collapsed';
  season$: Observable<Season | undefined> | undefined;
  team$: Observable<Team | undefined> | undefined;
  items$ = new BehaviorSubject<any[]>([]);
  deferredPrompt: Event | undefined;

  private unsubscribe$ = new Subject();

  constructor(
    private store: Store<StoreState>,
    private menuService: NbMenuService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.uid$ = this.store.pipe(select(AuthSelectors.selectUid));
    this.team$ = this.store.pipe(select(TeamSelectors.selectTeam));
    this.season$ = this.store.pipe(select(SeasonSelectors.selectSeason));
    this.menuService.onItemClick().subscribe(() => this.toggleMenu());
    this.initItems();
  }

  getInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
    });
  }

  initItems(): void {
    combineLatest([this.team$, this.season$])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params: any) => {
        const [team, season] = params;
        if (team && !season) {
          return this.items$.next(initItems2);
        }
        if (team && season) {
          return this.items$.next(fullItems);
        }
        this.items$.next(initItems);
      });
  }

  toggleMenu() {
    this.sidebarState =
      this.sidebarState === 'collapsed' ? 'expanded' : 'collapsed';
  }

  showInstallDialog() {}

  async logout() {
    this.store.dispatch(AuthActions.signOut());
    this.router.navigate(['login']);
    await localStorage.removeItem('team');
    await localStorage.removeItem('season');
    await localStorage.removeItem('user');
  }
}
