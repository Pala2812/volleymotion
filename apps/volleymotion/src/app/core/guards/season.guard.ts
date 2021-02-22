import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { StoreState } from '../store/reducers';
import { SeasonSelectors } from '../store/selectors';

@Injectable({
  providedIn: 'root',
})
export class SeasonGuard implements CanActivate {
  private constructor(private store: Store<StoreState>) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.pipe(
      select(SeasonSelectors.selectSeason),
      map((season) => !!season),
      tap((isSeasonSelected) => {
        if (!isSeasonSelected) {
          alert('Bitte wählen Sie eine Mannschaft und eine Saison aus');
        }
      }),
      take(1)
    );
  }
}
