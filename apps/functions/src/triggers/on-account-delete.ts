import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const onAccountDelete = functions
  .region('europe-west3')
  .auth.user()
  .onDelete(async (user) => {
    const uid = user?.uid;
    await admin.firestore().doc(`users/${uid}`).delete();
  });
