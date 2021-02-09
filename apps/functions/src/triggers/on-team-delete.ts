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
      .where('uid', '==', team.uid)
      .get()
      .then((docs) => docs.docs);

    for (const doc of docs) {
      await doc.ref.delete();
    }
  });
