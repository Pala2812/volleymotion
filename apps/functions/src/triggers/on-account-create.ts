import { Meta, role, User } from '@volleymotion/models';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const onAccountCreate = functions
  .region('europe-west3')
  .auth.user()
  .onCreate(async (userRecord) => {
    try {
      const uid = userRecord?.uid;
      const email = userRecord?.email;
      const createdAt = admin.firestore.Timestamp.now();
      const meta: Meta = {
        createdAt,
        updatedAt: createdAt,
      };
      const roles: role[] = ['Admin'];

      const user: Partial<User> = {
        uid,
        email,
        meta,
        roles,
      };

      await admin.firestore().doc(`users/${uid}`).create(user);
      const action_url = await getActionUrl(email, getUrl());
      await sendWelcomeMail(email, 'Patrick', 'Lange', action_url);
    } catch (e) {
      functions.logger.error(e);
    }
  });

const getUrl = () =>
  functions.config().url ?? 'http://localhost:4200/account-bestaetigen';

const getActionUrl = (email: string, url: string) =>
  admin.auth().generateEmailVerificationLink(email, {
    url,
  });

const sendWelcomeMail = (
  email: string,
  firstname: string,
  lastname: string,
  action_url: string
) =>
  admin
    .firestore()
    .collection('mail')
    .add({
      to: [email],
      template: {
        name: 'welcome-mail',
        data: {
          firstname,
          lastname,
          action_url,
        },
      },
    });
