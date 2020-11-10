import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const onAccountCreate = functions
  .region('europe-west3')
  .auth.user()
  .onCreate(async (user) => {
    const uid = user?.uid;
    const email = user?.email;
    const createdAt = admin.firestore.Timestamp.now();
    return await admin
      .firestore()
      .doc(`users/${uid}`)
      .create({ uid, email, createdAt });
  });
