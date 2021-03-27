import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Player, PlayerComment } from '@volleymotion/models';
import { from, Observable } from 'rxjs';
import firebase from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private fs: AngularFirestore) { }

  addOrUpdatePlayer(player: Player | Partial<Player>) {
    return from(
      this.fs.collection('players').doc(player?.id).set(player, { merge: true })
    );
  }

  loadPlayers(teamId: string, seasonId: string) {
    return from(
      this.fs
        .collection('players')
        .ref
        .orderBy('position', 'asc')
        .where('teamId', '==', teamId)
        .where('seasonId', '==', seasonId)
        .get()
        .then((docs) => docs.docs.map((doc) => doc.data() as Player))
        .then(players => players.sort((a, b) => a?.position?.localeCompare(b?.position)))
    );
  }

  loadPlayerById(id: string) {
    return this.fs.collection<Player>('players').doc<Player>(id).valueChanges();
  }

  deletePlayer(player: Player) {
    return from(this.fs.collection('players').doc(player.id).ref.delete());
  }

  addCommentToPlayer(playerComment: PlayerComment | Partial<PlayerComment>) {
    const id = this.fs.createId();
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();
    const comment = { id, createdAt, ...playerComment };
    return from(
      this.fs.collection('players').doc(comment?.playerId).collection('comments')
        .doc(id).set(comment)
    )
  };

  loadPlayerComments(player: Player): Observable<PlayerComment[]> {
    return this.fs.collection('players').doc(player?.id).collection<PlayerComment>('comments').valueChanges()
      .pipe(map((comments) => comments?.sort((a, b) => b?.createdAt?.toMillis() - a?.createdAt?.toMillis())));
  }

  deletePlayerComment(playerComment: PlayerComment) {
    return from(this.fs.collection('players').doc(playerComment.playerId).collection('comments').doc(playerComment.id).delete());
  }
}
