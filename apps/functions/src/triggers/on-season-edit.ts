import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { Season } from '@volleymotion/models';

export const onSeasonEdit = functions
    .region('europe-west3')
    .firestore.document('seasons/{saisonId}')
    .onWrite(async (snap) => {
        if (!snap.before.exists && !snap.after.exists) {
            return;
        }

        const seasonBefore = snap.before.data() as Season;
        const seasonAfter = snap.after.data() as Season;

        const decrement = firestore.FieldValue.increment(-1);
        const increment = firestore.FieldValue.increment(1);

        const decrementAudit: any = {};
        const incrementAudit: any = {};

        if (JSON.stringify(seasonBefore?.tags) !== JSON.stringify(seasonAfter?.tags)) {
            seasonBefore?.tags.forEach(tag => {
                decrementAudit[tag?.id] = {
                    ...tag,
                    counter: decrement
                };
            });

            seasonAfter?.tags.forEach(tag => {
                incrementAudit[tag?.id] = {
                    ...tag,
                    counter: increment
                };
            });
        }

        const batch = firestore().batch();

        const auditDoc = await firestore()
            .collection('audits')
            .doc('seasons')
            .get();

        await batch.commit().catch((error) => functions.logger.error(error));
        await auditDoc.ref.set(incrementAudit, { merge: true })
            .then(() => auditDoc.ref.set(decrementAudit, { merge: true }));
    });
