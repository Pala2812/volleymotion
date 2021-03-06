import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { Player, Season, Tag, Team } from '@volleymotion/models';
import { getTagsAudit } from '../helpers/tag-counter';

export const onPlayerCreate = functions
  .region('europe-west3')
  .firestore.document('players/{playerId}')
  .onCreate(async (snap) => {
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

      const team = await firestore()
        .collection('teams')
        .doc(player?.teamId)
        .get()
        .then(doc => doc.data() as Team);

      const seasonDate = (seasonDoc.data() as Season).name;

      const auditDoc = await firestore()
        .collection('audits')
        .doc(seasonDate)
        .get();

      const increment = firestore.FieldValue.increment(1);

      const season: Partial<Season> = {
        team: {
          [player.position]: increment,
          total: increment,
        },
      };

      const positions = {
        [team?.sportType]: {
          [team?.teamType]: {
            [team?.division]: {
              [player?.position]: increment,
            }
          }
        },
        positions: {
          [player?.position]: increment,
        },
        total: increment,
      };

      const strengths = getTagsAudit(team, player, player?.strengths, increment);
      const improvements = getTagsAudit(team, player, player?.improvements, increment);
      const weaknesses = getTagsAudit(team, player, player?.weaknesses, increment);

      const tags = {
        strengths,
        improvements,
        weaknesses
      };

      await tagDoc.ref.set(tags, { merge: true });
      await seasonDoc.ref.set(season, { merge: true });
      await auditDoc.ref.set(positions, { merge: true });
    } catch (e) {
      functions.logger.error(e);
    }
  });
