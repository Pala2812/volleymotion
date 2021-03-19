import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Season, Team } from '@volleymotion/models';
import { take } from 'rxjs/operators';
import { User } from '../models';
import {
  AuthActions,
  PlayerActions,
  SeasonActions,
  TeamActions,
  UserActions,
} from '../store/actions';
import { StoreState } from '../store/reducers';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  constructor(
    private fs: AngularFirestore,
    private auth: AngularFireAuth,
    private store: Store<StoreState>
  ) { }

  async init() {
    return this.auth.user
      .pipe(take(1))
      .toPromise()
      .then(async (userCrendetials) => {
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

  async loadFromCache() {
    try {
      const team = JSON.parse(await localStorage.getItem('team')) as Team;
      const season = JSON.parse(await localStorage.getItem('season')) as Season;
      const user = JSON.parse(await localStorage.getItem('user')) as User;

      this.store.dispatch(TeamActions.setTeam({ team }));
      this.store.dispatch(SeasonActions.setSeason({ season }));
      this.store.dispatch(UserActions.setUser({ user }));
      this.store.dispatch(TeamActions.loadTeamById({ id: team?.id }));
      this.store.dispatch(SeasonActions.loadSeasonById({ id: season?.id }));
      this.store.dispatch(PlayerActions.loadPlayers({ teamId: team?.id, seasonId: season?.id }));
    } catch { }
  }
}
