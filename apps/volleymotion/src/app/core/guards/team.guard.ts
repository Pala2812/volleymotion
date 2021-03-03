import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { StoreState } from '../store/reducers';
import { TeamSelectors } from '../store/selectors';

@Injectable({
  providedIn: 'root',
})
export class TeamGuard implements CanActivate {
  private constructor(private store: Store<StoreState>, private toastService: NbToastrService, private router: Router) { }

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.pipe(
      select(TeamSelectors.selectTeam),
      map((team) => !!team),
      tap((isTeamSelected) => {
        if (!isTeamSelected) {
          this.toastService.info('Bitte wählen Sie eine Mannschaft aus', 'Mannschaft auswählen');
          this.router.navigate(['/mannschaften']);
        }
      }),
      take(1)
    );
  }
}
