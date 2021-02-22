import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { StoreState } from '../store/reducers';
import { TeamSelectors } from '../store/selectors';

@Injectable({
  providedIn: 'root',
})
export class TeamGuard implements CanActivate {
  private constructor(private store: Store<StoreState>) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.pipe(
      select(TeamSelectors.selectTeam),
      map((team) => !!team),
      tap((isTeamSelected) => {
        if (!isTeamSelected) {
          alert('Bitte wählen Sie eine Mannschaft aus');
        }
      }),
      take(1)
    );
  }
}
