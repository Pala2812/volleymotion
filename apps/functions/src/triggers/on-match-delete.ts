import * as functions from 'firebase-functions';
import { Match } from '@volleymotion/models';
import { firestore } from 'firebase-admin';

export const onMatchDelete = functions
    .region('europe-west3')
    .firestore.document('matches/{matchId}')
    .onDelete(async (snap) => {
        const match = snap.data() as Match;
        const docs = await firestore().collection('matches').doc(match.id).collection('comments')
            .get()
            .then(docs => docs.docs)

        for (const doc of docs) {
            await doc.ref.delete();
        }
    });