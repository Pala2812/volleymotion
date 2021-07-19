import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Season } from '@volleymotion/models';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeasonService {
  constructor(private fs: AngularFirestore) {}

  loadSeasonsByTeamId(teamId: string) {
    return from(
      this.fs
        .collection('seasons')
        .ref.where('teamId', '==', teamId)
        .get()
        .then((docs) => docs.docs.map((doc) => doc.data() as Season))
    );
  }

  loadSeasonById(id: string) {
    return from(
      this.fs
        .collection('seasons')
        .doc(id)
        .ref.get()
        .then((doc) => doc.data() as Season)
    );
  }

  updateSeason(season: Partial<Season>) {
    return from(this.fs.collection('seasons').doc(season.id).update(season));
  }
}
