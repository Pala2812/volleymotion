import * as admin from 'firebase-admin';
import { onAccountCreate } from './triggers/on-account-create';

admin.initializeApp();

exports.onAccountCreate = onAccountCreate;
