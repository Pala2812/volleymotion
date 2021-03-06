import { role, User } from '@volleymotion/models';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const onAccountCreate = functions
  .region('europe-west3')
  .auth.user()
  .onCreate(async (userRecord) => {
    const uid = userRecord?.uid;
    const email = userRecord?.email;
    const createdAt = admin.firestore.Timestamp.now();
    const roles: role[] = ['Coach'];

    const user: Partial<User> = {
      uid, email, createdAt, roles
    };

    return await admin
      .firestore()
      .doc(`users/${uid}`)
      .create(user);
  });
