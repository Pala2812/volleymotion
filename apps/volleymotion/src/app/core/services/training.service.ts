import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Training, TrainingUnit } from '@volleymotion/models';
import { DateTime } from 'luxon';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  constructor(private fs: AngularFirestore) {}

  create(training: Training) {
    return from(this.fs.doc(`training-days/${training?.id}`).set(training));
  }

  update(training: Partial<Training>) {
    return from(this.fs.doc(`training-days/${training?.id}`).update(training));
  }

  delete(id: string) {
    return from(this.fs.doc(`training-days/${id}`).delete());
  }

  getAll(seasonId: string, teamId: string) {
    return from(
      this.fs
        .collection<Training>('training-days')
        .ref.where('seasonId', '==', seasonId)
        .where('teamId', '==', teamId)
        .orderBy('weekday', 'asc')
        .get()
        .then((docs: any) => docs.docs.map((doc: any) => doc.data()))
    );
  }

  createTrainingUnit(trainingUnit: TrainingUnit) {
    return from(
      this.fs.doc(`training-units/${trainingUnit?.id}`).set(trainingUnit)
    );
  }

  getTrainingUnits(trainingId: string, seasonId: string, limit = 2) {
    const today = DateTime.now().endOf('day').startOf('day').toJSDate();
    return from(
      this.fs
        .collection<TrainingUnit>('training-units')
        .ref.where('seasonId', '==', seasonId)
        .where('trainingId', '==', trainingId)
        .orderBy('date', 'asc')
        .where('date', '>=', today)
        .limit(2)
        .get()
        .then((docs: any) =>
          docs.docs.map((doc: any) => doc.data() as TrainingUnit)
        )
    );
  }

  getId() {
    return this.fs.createId();
  }
}
