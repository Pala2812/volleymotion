import * as functions from 'firebase-functions';
import { Match } from '@volleymotion/models';

export const onMatchCreate = functions
  .region('europe-west3')
  .firestore.document('matches/{matchId}')
  .onCreate(async (snap) => {
    const match = snap.data() as Match;
    match.status = 'Ausstehend';
    match.participatingPlayers = [];
    match.tags = [];
    match.comments = [];
    match.sets = {
      won: 0,
      lost: 0,
      total: 0,
    };

    await snap.ref.set(match, { merge: true });
  });
