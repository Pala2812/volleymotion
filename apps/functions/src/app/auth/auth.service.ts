import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

@Injectable()
export class AuthService {
  constructor() {}

  async getPasswordResetMail(email: string) {
    const url = getUrl();
    const action_url = await admin
      .auth()
      .generatePasswordResetLink(email, { url, handleCodeInApp: true });

    await admin
      .firestore()
      .collection('mail')
      .add({
        to: [email],
        template: {
          name: 'password-reset-mail',
          data: {
            action_url,
          },
        },
      });
  }

  async confirmAccount(email: string) {
    const user = await admin.auth().getUserByEmail(email.toLowerCase());
    const uid = user.uid;

    const userPreferences = { isAccountVerified: true };
    return await admin
      .firestore()
      .collection('users')
      .doc(uid)
      .set(userPreferences, { merge: true });
  }
}

const getUrl = () => functions.config().url ?? 'http://localhost:4200';
