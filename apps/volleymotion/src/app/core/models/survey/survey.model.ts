import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

export interface Article {
    id: string;
    uid: string;
    createdAt: Timestamp;
    title: string;
    description: string;
    summary: string;
}