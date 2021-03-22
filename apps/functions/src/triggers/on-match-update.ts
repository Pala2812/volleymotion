import * as functions from 'firebase-functions';
import { Match } from '@volleymotion/models';

export const onMatchUpdate = functions
    .region('europe-west3')
    .firestore.document('matches/{matchId}')
    .onUpdate(async (snap) => {
        const match = snap.after.data() as Match;
        const matchBefore = snap.before.data() as Match;

        if (JSON.stringify(match?.result?.sets) !== JSON.stringify(matchBefore?.result?.sets)) {
            match.result.setsWon = 0;
            match.result.setsLost = 0;
            match.result.scoredPoints = 0;
            match.result.collectedPoints = 0;

            match.result.sets.forEach(set => {
                if (set.homeTeam === 0 && set.opponent === 0) {
                    return;
                }

                if (set.homeTeam > set.opponent) {
                    match.result.setsWon++;
                } else {
                    if (set.homeTeam !== set.opponent) {
                        match.result.setsLost++;
                    }
                }
                match.result.scoredPoints += set.homeTeam;
                match.result.collectedPoints += set.opponent;
            });

            if (match.result.setsWon !== match.result.setsLost) {
                const didWin = (match.result.setsWon > match.result.setsLost);
                match.status = didWin ? 'Gewonnen' : 'Verloren';
            }
            
            await snap.after.ref.update(match);
        }
    });