import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SwUpdate } from '@angular/service-worker';
import { Store } from '@ngrx/store';

import {
  AuthActions,
  SeasonActions,
  TeamActions,
  UserActions,
} from './core/store/actions';
import { StoreState } from './core/store/reducers';
import { NetworkStatusService } from './core/services/network-status.service';
import { AngularFirestore } from '@angular/fire/firestore';

import { User } from './core/models';
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
    private networkStatusService: NetworkStatusService
  ) {}

  ngOnInit(): void {
    this.auth.user.subscribe((userCrendetials) => {
      if (userCrendetials) {
        this.store.dispatch(AuthActions.setUid({ uid: userCrendetials.uid }));
        this.fs
          .collection('users')
          .doc<User>(userCrendetials.uid)
          .valueChanges()
          .subscribe(async (user) => {
            this.store.dispatch(UserActions.setUser({ user }));

            const teamId = await localStorage.getItem('teamId');
            const seasonId = await localStorage.getItem('seasonId');

            this.store.dispatch(TeamActions.loadTeamById({ id: teamId }));
            this.store.dispatch(SeasonActions.loadSeasonById({ id: seasonId }));
          });
      }
    });
    this.verifyAndUpdate();
    this.networkStatusService.init();
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
