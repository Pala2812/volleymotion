import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Match, MatchComment } from '@volleymotion/models';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  constructor(private fs: AngularFirestore) {}

  loadMatches(teamId: string, seasonId: string): Observable<Match[]> {
    return from(
      this.fs
        .collection<Match>('matches')
        .ref.where('teamId', '==', teamId)
        .where('seasonId', '==', seasonId)
        .get()
        .then((docs) => docs.docs.map((doc) => doc.data() as Match))
        .then((matches) => {
          return matches.sort(
            (a, b) => a?.date?.toMillis() - b?.date?.toMillis()
          );
        })
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

  addCommentToMatch(match: Match, matchComment: MatchComment) {
    return from(
      this.fs
        .collection('matches')
        .doc(match.id)
        .collection('comments')
        .doc(matchComment.id)
        .set(matchComment)
    );
  }

  deleteMatchComment(matchComment: MatchComment) {
    return from(
      this.fs
        .doc(`matches/${matchComment?.matchId}/comments/${matchComment?.id}`)
        .delete()
    );
  }

  loadMatchComments(match: Match | undefined) {
    return this.fs
      .collection('matches')
      .doc(match?.id)
      .collection<MatchComment>('comments')
      .valueChanges()
      .pipe(
        map((comments) =>
          comments?.sort(
            (a: any, b: any) => b?.createdAt?.toMillis() - a?.createdAt?.toMillis()
          )
        )
      );
  }

  loadMatchById(id: string) {
    return this.fs.collection('matches').doc<Match>(id).valueChanges();
  }

  addMatchDetail() {}

  getId() {
    return this.fs.createId();
  }
}
