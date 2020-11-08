import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  signInWithEmailAndPassword(email: string, password: string) {
    return from(this.auth.signInWithEmailAndPassword(email, password));
  }

  createUserWithEmailAndPassword(email: string, password: string) {
    return from(this.auth.createUserWithEmailAndPassword(email, password));
  }
}
