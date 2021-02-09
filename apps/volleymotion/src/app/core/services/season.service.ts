import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Season } from '@volleymotion/models';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeasonService {
  constructor(private fs: AngularFirestore) {}

  getSeasonsByTeamId(teamId: string) {
    return from(
      this.fs
        .collection('seasons')
        .ref.where('teamId', '==', teamId)
        .get()
        .then((docs) => docs.docs.map((doc) => doc.data() as Season))
    );
  }
}
