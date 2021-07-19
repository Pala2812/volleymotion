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
}

const getUrl = () => functions.config().url ?? 'http://localhost:4200';
