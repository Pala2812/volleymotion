import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Season, Team, User } from '@volleymotion/models';
import { take } from 'rxjs/operators';
import {
  AuthActions,
  MatchActions,
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

  async init() {
    return this.auth.user
      .pipe(take(1))
      .toPromise()
      .then(async (userCrendetials: any) => {
        if (userCrendetials?.uid) {
          this.store.dispatch(AuthActions.setUid({ uid: userCrendetials.uid }));

          return this.fs
            .collection('users')
            .doc<User>(userCrendetials.uid)
            .valueChanges()
            .subscribe((user: User | undefined) =>
              this.store.dispatch(UserActions.setUser({ user }))
            );
        }
      });
  }

  async loadFromCache() {
    try {
      const t = await localStorage.getItem('team');
      const s = await localStorage.getItem('season');
      const u = await localStorage.getItem('user');

      if (u) {
        const user = JSON.parse(u) as User;
        this.store.dispatch(UserActions.setUser({ user }));
      }

      if (t && s) {
        const team = JSON.parse(t) as Team;
        const season = JSON.parse(s) as Season;

        this.store.dispatch(TeamActions.setTeam({ team }));
        this.store.dispatch(SeasonActions.setSeason({ season }));

        this.store.dispatch(TeamActions.loadTeamById({ id: team?.id }));
        this.store.dispatch(SeasonActions.loadSeasonById({ id: season?.id }));
        this.store.dispatch(
          PlayerActions.loadPlayers({
            teamId: season?.teamId,
            seasonId: season?.id,
          })
        );
        this.store.dispatch(
          MatchActions.loadMatches({
            teamId: season.teamId,
            seasonId: season?.id,
          })
        );
      }
    } catch {}
  }
}
