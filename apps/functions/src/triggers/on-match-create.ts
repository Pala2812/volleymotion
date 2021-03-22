import * as functions from 'firebase-functions';
import { Match, MatchSet } from '@volleymotion/models';

export const onMatchCreate = functions
  .region('europe-west3')
  .firestore.document('matches/{matchId}')
  .onCreate(async (snap) => {
    const match = snap.data() as Match;
    if (!match?.result) {
      match.status = 'Ausstehend';
      match.playerParticipations = [];
      match.result = {
        setsWon: 0,
        setsLost: 0,
        scoredPoints: 0,
        collectedPoints: 0,
        sets: getSets()
      }
      await snap.ref.set(match, { merge: true });
    }
  });

const getSets = () => {
  return new Array(5).fill(0, 0, 10).map(() => {
    const matchSet: MatchSet = {
      homeTeam: 0,
      opponent: 0
    }
    return matchSet;
  });
}