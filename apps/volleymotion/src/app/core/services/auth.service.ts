import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, throwError } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private fs: AngularFirestore) {}

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

  createUserWithEmailAndPassword(email: string, password: string) {
    return from(this.auth.createUserWithEmailAndPassword(email, password)).pipe(
      mergeMap((userCredentials) =>
        this.fs
          .doc<User>(`users/${userCredentials.user.uid}`)
          .snapshotChanges()
          .pipe(
            filter((snapshot) => snapshot.payload.exists),
            map((snapshot) => snapshot.payload.data())
          )
      )
    );
  }
}
