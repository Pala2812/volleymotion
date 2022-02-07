import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { Training, TrainingUnit } from '@volleymotion/models';
import { DateTime } from 'luxon';
import { Timestamp } from 'firebase/firestore';

export const onTrainingDayCreate = functions
  .region('europe-west3')
  .firestore.document('training-days/{trainingDayId}')
  .onCreate(async (snap) => {
    const training: Training = snap.data() as Training;
    const now = DateTime.fromMillis(firestore.Timestamp.now().seconds * 1000);
    let next = 7 - now.weekday + now.weekday - 14;

    for (let i = 0; i < 52; i++) {
      const doc = firestore().collection('training-units').doc();
      next = next + i * 7;
      const trainingUnit: TrainingUnit = {
        id: doc.id,
        date: Timestamp.fromDate(now.plus({ days: next }).toJSDate()),
        exerciseIds: [],
        participantIds: [],
        admins: [training.uid],
        trainingId: training.id,
        seasonId: training.seasonId,
        teamId: training.teamId,
        videoTrainingIds: [],
        uid: training.uid,
      };
      await doc.set(trainingUnit);
    }
  });
