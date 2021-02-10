import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TrainingMatch } from '@volleymotion/models';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingMatchService {

  constructor(private fs: AngularFirestore) {}

  createTrainingMatch(trainingMatch: TrainingMatch) {
    return from(this.fs.collection('tranings-matches').doc(trainingMatch.id).set(trainingMatch));
  }

  deleteTrainingMatch(trainingMatch: TrainingMatch) {
    return from(this.fs.collection('training-matches').doc(trainingMatch?.id).ref.delete());
  }

  loadTrainingMatches() {
    return this.fs.collection<TrainingMatch>('traning-matches').valueChanges();
  }
}
