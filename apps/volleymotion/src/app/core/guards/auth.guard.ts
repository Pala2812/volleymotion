import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router) { }

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.user.pipe(
      map((user) => !!user),
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['login']);
        }
      }),
      take(1)
    );
  }
}
