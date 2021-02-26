import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { Player, Season } from '@volleymotion/models';

export const onPlayerCreate = functions
  .region('europe-west3')
  .firestore.document('players/{playerId}')
  .onCreate(async (snap) => {
    const player = snap.data() as Player;

    const seasonDoc = await firestore()
      .collection(`seasons`)
      .where('teamId', '==', player.teamId)
      .where('seasonId', '==', player.seasonId)
      .get()
      .then((docs) => docs.docs[0]);

    const auditDoc = await firestore()
      .collection('audits')
      .doc(player?.seasonId)
      .get();

    const increment = firestore.FieldValue.increment(1);

    const season: Partial<Season> = {
      team: {
        [player.position]: increment,
        total: increment,
      },
    };

    const positions = {
      [player?.position]: increment,
      total: increment,
    };

    await seasonDoc.ref.set(season, { merge: true });
    await auditDoc.ref.set(positions, { merge: true });
  });
