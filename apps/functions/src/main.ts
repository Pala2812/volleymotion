import * as admin from 'firebase-admin';
import { onAccountCreate } from './triggers/on-account-create';
import { onSurveyCreate } from './triggers/on-survey-create';

admin.initializeApp();

exports.onAccountCreate = onAccountCreate;
exports.onSurveyCreate = onSurveyCreate;
