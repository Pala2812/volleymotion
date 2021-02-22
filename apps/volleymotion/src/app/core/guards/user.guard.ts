import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { StoreState } from '../store/reducers';
import { UserSelectors } from '../store/selectors';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  private constructor(private store: Store<StoreState>) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.pipe(
      select(UserSelectors.selectUser),
      map((user) => !!user),
      tap((isUser) => {
        if (!isUser) {
          alert('Fehler beim Laden des Users');
        }
      }),
      take(1)
    );
  }
  
}
