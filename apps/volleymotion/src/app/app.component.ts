import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SwUpdate } from '@angular/service-worker';
import { Store } from '@ngrx/store';

import {
  AuthActions,
  PlayerActions,
  SeasonActions,
  TagActions,
  TeamActions,
  UserActions,
} from './core/store/actions';
import { StoreState } from './core/store/reducers';
import { NetworkStatusService } from './core/services/network-status.service';
import { AngularFirestore } from '@angular/fire/firestore';

import { User } from './core/models';
import { Season, Team } from '@volleymotion/models';
import { AppInitService } from './core/services/app-init.service';
@Component({
  selector: 'volleymotion-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'volleymotion';

  constructor(
    private auth: AngularFireAuth,
    private store: Store<StoreState>,
    private fs: AngularFirestore,
    private swUpdate: SwUpdate,
    private initService: AppInitService,
    private networkStatusService: NetworkStatusService
  ) { }

  ngOnInit(): void {
    try {
      this.initService.init();
    } catch { }

    this.store.dispatch(TagActions.loadTags());
    this.verifyAndUpdate();
    this.networkStatusService.init();

    this.auth.user.subscribe(async (userCrendetials) => {
      if (userCrendetials?.uid) {
        this.store.dispatch(AuthActions.setUid({ uid: userCrendetials.uid }));
        return this.fs
          .collection('users')
          .doc<User>(userCrendetials.uid)
          .valueChanges()
          .subscribe(async (user) => {
            this.store.dispatch(UserActions.setUser({ user }));
          });
      }
    });
  }

  verifyAndUpdate() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        /*  const ref = this.snackbar.open(
          'Eine neue Version ist Verfügbar',
          'Updaten',
          { horizontalPosition: 'left', verticalPosition: 'top' }
        );

        ref.onAction().subscribe((action) => {
          window.location.reload();
        }); */
      });
    }
  }
}
