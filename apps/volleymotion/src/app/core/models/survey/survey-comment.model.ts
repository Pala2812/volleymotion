import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

export interface SurveyComment {
    uid?: string;
    surveyId: string;
    createdAt?: Timestamp | firebase.firestore.FieldValue;
    message: string;
}