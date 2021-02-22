import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Season, Team } from '@volleymotion/models';
import { resolve } from 'dns';
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
  ) {}

  init() {
    return this.auth.user
      .pipe(take(1))
      .toPromise()
      .then(async (userCrendetials) => {
        if (userCrendetials) {
          this.store.dispatch(AuthActions.setUid({ uid: userCrendetials.uid }));
          await this.loadFromCache();

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
    const team = JSON.parse(await localStorage.getItem('team')) as Team;
    const season = JSON.parse(await localStorage.getItem('season')) as Season;
    const user = JSON.parse(await localStorage.getItem('user')) as User;

    this.store.dispatch(TeamActions.setTeam({ team }));
    this.store.dispatch(SeasonActions.setSeason({ season }));
    this.store.dispatch(UserActions.setUser({ user }));

    this.store.dispatch(TeamActions.loadTeamById({ id: team?.id }));
    this.store.dispatch(SeasonActions.loadSeasonById({ id: season?.id }));
    this.store.dispatch(PlayerActions.loadPlayersByTeamId({ teamId: team?.id }));
  }
}
