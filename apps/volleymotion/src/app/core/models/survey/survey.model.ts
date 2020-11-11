import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

export interface Survey {
    id: string;
    uid: string;
    createdAt: Timestamp | firebase.firestore.FieldValue;
    title: string;
    description: string;
}