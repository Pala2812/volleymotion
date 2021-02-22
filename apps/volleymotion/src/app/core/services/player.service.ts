import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Player } from '@volleymotion/models';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private fs: AngularFirestore) {}

  addOrUpdatePlayer(player: Player | Partial<Player>) {
    return from(
      this.fs.collection('players').doc(player?.id).set(player, { merge: true })
    );
  }

  loadPlayers(teamId: string, seasonId: string) {
    console.log(teamId, seasonId);
    return from(
      this.fs
        .collection('players')
        .ref.where('teamId', '==', teamId)
        .where('seasonId', '==', seasonId)
        .get()
        .then((docs) => docs.docs.map((doc) => doc.data() as Player))
    );
  }

  deletePlayer(player: Player) {
    return from(this.fs.collection('players').doc(player.id).ref.delete());
  }
}
