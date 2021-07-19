import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'apps/volleymotion/src/environments/environment';
import { from, throwError } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private fs: AngularFirestore,
    private http: HttpClient
  ) {}

  signInWithEmailAndPassword(email: string, password: string) {
    return from(this.auth.signInWithEmailAndPassword(email, password)).pipe(
      mergeMap((userCredentials) =>
        this.fs
          .doc<User>(`users/${userCredentials.user.uid}`)
          .valueChanges()
          .pipe(
            map((user) => {
              if (!user) {
                throwError(new Error('Kein Benutzer gefunden!'));
              }

              return user;
            })
          )
      )
    );
  }

  createUserWithEmailAndPassword(
    email: string,
    password: string,
    user: Partial<User>
  ) {
    return from(this.auth.createUserWithEmailAndPassword(email, password)).pipe(
      mergeMap((userCredentials) =>
        this.fs
          .doc<User>(`users/${userCredentials.user.uid}`)
          .snapshotChanges()
          .pipe(
            filter((snapshot) => snapshot.payload.exists),
            mergeMap((snapshot) =>
              this.fs
                .doc(`users/${snapshot.payload.id}`)
                .update(user)
                .then(() => snapshot)
            ),
            map((snapshot) => snapshot.payload.data())
          )
      )
    );
  }

  signOut() {
    this.auth.signOut();
  }

  confirmAccount(email: string) {
    return this.http.post(`${this.endpoint}/confirm-account`, { email });
  }

  get endpoint() {
    return `${environment.api}/auth`;
  }
}
