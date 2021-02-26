import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { Season, Team } from '@volleymotion/models';
import { DateTime } from 'luxon';

export const onTeamCreate = functions
  .region('europe-west3')
  .firestore.document('teams/{teamId}')
  .onCreate(async (snap) => {
    const team = snap.data() as Team;
    const nextYear = DateTime.local().plus({ years: 1 }).toJSDate();

    const currentSeason = createSeason(team, getSeasonName(new Date()));
    const nextSeason = createSeason(team, getSeasonName(nextYear));

    const batch = firestore().batch();
    batch.create(currentSeason.doc, currentSeason.season);
    batch.create(nextSeason.doc, nextSeason.season);
    
    const auditDoc = await firestore()
    .collection('audits')
    .doc('teams')
    .get();

    const increment = firestore.FieldValue.increment(1);

    const audit = {
      [team?.teamType]: increment,
      [team?.sportType]: increment,
      [team?.division]: increment,
    }

    await batch.commit().catch((error) => functions.logger.error(error));
    await auditDoc.ref.set(audit, {merge: true});
  });

const createSeason = (team: Team, name: string) => {
  const doc = firestore().collection('seasons').doc();

  const id = doc.id;
  const teamId = team.id;
  const { uid } = team;

  const season: Season = {
    id,
    uid,
    teamId,
    name,
    goal: '',
    tags: [],
    matches: {
      lost: 0,
      total: 0,
      won: 0,
    },
    traningParticipation: {
      current: 0,
      max: 0,
    },
    team: {
      
    }
  };

  return { doc, season };
};

const getSeasonName = (date: Date) => {
  const currentYear = date.getFullYear();
  const lastYear = date.getFullYear() - 1;
  return `${lastYear} - ${currentYear}`;
};
