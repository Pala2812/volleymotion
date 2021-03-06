import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { Team } from '@volleymotion/models';

export const onTeamDelete = functions
  .region('europe-west3')
  .firestore.document('teams/{teamId}')
  .onDelete(async (snap) => {
    const team = snap.data() as Team;

    const docs = await firestore()
      .collection('seasons')
      .where('teamId', '==', team.id)
      .get()
      .then((docs) => docs.docs);

    const auditDoc = await firestore().collection('audits').doc('teams').get();

    const decrement = firestore.FieldValue.increment(-1);

    const audit = {
      total: {
        [team?.teamType]: decrement,
        [team?.sportType]: decrement,
        [team?.division]: decrement,
      },
      [team?.sportType]: {
        [team?.teamType]: {
          [team?.division]: decrement
        }
      },
    }

    for (const doc of docs) {
      await doc.ref.delete();
    }

    await auditDoc.ref.set(audit, { merge: true });
  });
