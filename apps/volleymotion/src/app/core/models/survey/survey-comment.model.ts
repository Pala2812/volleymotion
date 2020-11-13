import firebase from 'firebase/app';
import { User } from '../user.model';
import Timestamp = firebase.firestore.Timestamp;

export interface SurveyComment {
    uid?: string;
    user?: User;
    surveyId: string;
    createdAt?: Timestamp;
    message: string;
}