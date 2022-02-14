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
    const now = DateTime.fromMillis(
      firestore.Timestamp.now().seconds * 1000
    ).startOf('day');

    for (let i = 0; i < 52; i++) {
      const doc = firestore().collection('training-units').doc();
      const next = 7 - now.weekday + now.weekday - 14 + i * 7;

      const trainingUnit: TrainingUnit = {
        id: doc.id,
        date: now.plus({ days: next }).toJSDate() as unknown as Timestamp,
        exerciseIds: [],
        participantIds: [],
        pendingParticipantIds: [],
        nonParticipantIds: [],
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
