import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const onCommentCreate = functions
  .region('europe-west3')
  .firestore.document(`surveys/{id}/comments/{commentId}`)
  .onCreate(async (snap) => {
      const comment = snap.data();
      await admin.firestore().doc(`users/${comment.uid}/comments/${comment.id}`).create(comment)
  });
