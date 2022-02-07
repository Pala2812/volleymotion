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
    const unitDeletionRequest = this.fs
      .collection('training-units')
      .ref.where('trainingId', '==', id)
      .get()
      .then((docs) =>
        docs.docs.map((doc) => this.fs.doc(`training-units/${doc.id}`).delete())
      );

    const trainingDayDeletionRequest = this.fs
      .doc(`trainings-days/${id}`)
      .delete();

    return from(Promise.all([unitDeletionRequest, trainingDayDeletionRequest]));
  }

  getAll(seasonId: string, teamId: string) {
    return from(
      this.fs
        .collection<Training>('training-days')
        .ref.where('seasonId', '==', seasonId)
        .where('teamId', '==', teamId)
        .get()
        .then((docs: any) => docs.docs.map((doc: any) => doc.data()))
    );
  }

  createTrainingUnit(trainingUnit: TrainingUnit) {
    return from(
      this.fs.doc(`training-units/${trainingUnit?.id}`).set(trainingUnit)
    );
  }

  getTrainingUnits(seasonId: string, teamId: string) {
    const today = DateTime.now().endOf('day').toJSDate();
    return from(
      this.fs
        .collection<TrainingUnit>('training-units')
        .ref.where('seasonId', '==', seasonId)
        .where('teamId', '==', teamId)
        .where('date', '>=', today)
        .limit(2)
        .get()
        .then((docs: any) => docs.docs.map((doc: any) => doc.data() as TrainingUnit))
    );
  }

  getId() {
    return this.fs.createId();
  }
}
