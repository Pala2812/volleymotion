import * as functions from 'firebase-functions';

export const onSurveyCreate = functions
  .region('europe-west3')
  .firestore.document('surveys/{id}')
  .onCreate(async (snap, context) => {
    const survey = snap.data();
    survey.uid = context.auth.uid;
    survey.id = snap.id;
    await snap.ref.update(survey);
  });
