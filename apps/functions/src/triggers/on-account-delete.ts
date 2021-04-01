import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { domainToASCII } from 'url';

export const onAccountDelete = functions
  .region('europe-west3')
  .auth.user()
  .onDelete(async (user) => {
    const uid = user?.uid;
    await admin.firestore().doc(`users/${uid}`).delete();

    const matchPromises = await admin.firestore().collection('matches').where('uid', '==', uid).get()
      .then(docs => docs.docs.map(doc => doc.ref.delete()));

    const seasonPromises = await admin.firestore().collection('seasons').where('uid', '==', uid).get()
      .then(docs => docs.docs.map(doc => doc.ref.delete()));

    const playerPromises = await admin.firestore().collection('players').where('uid', '==', uid).get()
      .then(docs => docs.docs.map(doc => doc.ref.delete()));

    const trainingMatchesPromises = await admin.firestore().collection('training-matches').where('uid', '==', uid)
      .get()
      .then(docs => docs.docs.map(doc => doc.ref.delete()));

    const messagesPromises = await admin.firestore().collection('messages').where('uid', '==', uid).get()
      .then(docs => docs.docs.map(doc => doc.ref.delete()));

    await matchPromises;
    await seasonPromises;
    await playerPromises;
    await trainingMatchesPromises;
    await messagesPromises;
  });
