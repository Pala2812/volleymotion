import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AuthActions } from './core/store/actions';

import { StoreState } from './core/store/reducers';

@Component({
  selector: 'volleymotion-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'volleymotion';

  constructor(
    private auth: AngularFireAuth,
    private store: Store<StoreState>
  ) {}

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      if (user) {
        this.store.dispatch(AuthActions.setUid({ uid: user.uid }));
      }
    });
  }
}
