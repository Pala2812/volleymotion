import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Team } from '@volleymotion/models';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private fs: AngularFirestore) {}

  createOrUpdateTeam(team: Team | Partial<Team>) {
    return from(this.fs.collection('teams').doc(team.id).set(team));
  }

  loadTeams(uid: string): Observable<Team[]> {
    return from(
      this.fs
        .collection<Team>('teams')
        .ref.where('uid', '==', uid)
        .get()
        .then((docs) => docs.docs.map((doc) => doc.data() as Team))
    );
  }

  loadTeamById(id: string): Observable<Team> {
    return from(
      this.fs
        .collection<Team>('teams')
        .doc<Team>(id)
        .ref.get()
        .then((doc) => doc.data() as Team)
    );
  }

  deleteTeam(team: Team) {
    return from(this.fs.collection('teams').doc(team.id).delete());
  }
}
