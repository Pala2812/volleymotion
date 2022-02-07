import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { Training } from '@volleymotion/models';

export const onTrainingDayDelete = functions
  .region('europe-west3')
  .firestore.document('training-days/{trainingDayId}')
  .onDelete(async (snap) => {
    const training: Training = snap.data() as Training;

    const trainingUnits = await firestore()
      .collection('training-units')
      .where('trainingId', '==', training.id)
      .get();

    for (const doc of trainingUnits.docs) {
      await doc.ref.delete();
    }
  });
