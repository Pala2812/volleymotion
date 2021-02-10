import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Match } from '@volleymotion/models';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  constructor(private fs: AngularFirestore) {}

  loadMatches(teamId: string, seasonId: string) {
    return from(
      this.fs
        .collection<Match>('matches')
        .ref.where('teamId', '==', teamId)
        .where('seasonId', '==', seasonId)
        .get()
        .then((docs) => docs.docs.map((doc) => doc.data() as Match))
    );
  }

  addOrUpdateMatch(match: Match | Partial<Match>) {
    return from(
      this.fs.collection('matches').doc(match.id).set(match, { merge: true })
    );
  }

  deleteMatch(match: Match) {
    return from(this.fs.collection('matches').doc(match.id).delete());
  }

  getId() {
    return this.fs.createId();
  }
}