import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { Player, Season, Team } from '@volleymotion/models';
import { getTagsAudit } from '../helpers/tag-counter';

export const onPlayerDelete = functions
  .region('europe-west3')
  .firestore.document('players/{playerId}')
  .onDelete(async (snap) => {
    try {
      const player = snap.data() as Player;

      const seasonDoc = await firestore()
        .collection(`seasons`)
        .doc(player?.seasonId)
        .get();

      const tagDoc = await firestore()
        .collection('audits')
        .doc('tags')
        .get();

      const playerCommentsPromises = await firestore()
        .collection('players')
        .doc(player?.id)
        .collection('comments')
        .get()
        .then(docs => docs.docs.map(doc => doc.ref.delete()));


      const seasonDate = (seasonDoc.data() as Season).name;

      const team = await firestore()
        .collection('teams')
        .doc(player?.teamId)
        .get()
        .then(doc => doc.data() as Team);

      const auditDoc = await firestore()
        .collection('audits')
        .doc(seasonDate)
        .get();


      const decrement = firestore.FieldValue.increment(-1);

      const season: Partial<Season> = {
        team: {
          [player.position]: decrement,
          total: decrement,
        },
      };

      const positions = {
        [team?.sportType]: {
          [team?.teamType]: {
            [team?.division]: {
              [player?.position]: decrement,
            }
          }
        },
        positions: {
          [player?.position]: decrement,
        },
        total: decrement,
      };

      const strengths = getTagsAudit(team, player, player?.strengths, decrement);
      const improvements = getTagsAudit(team, player, player?.improvements, decrement);
      const weaknesses = getTagsAudit(team, player, player?.weaknesses, decrement);

      const tags = {
        strengths,
        improvements,
        weaknesses
      };

      await tagDoc.ref.set(tags, { merge: true });
      await seasonDoc.ref.set(season, { merge: true });
      await auditDoc.ref.set(positions, { merge: true });
      await playerCommentsPromises;
    } catch (e) {
      functions.logger.error(e);
    }
  });
