import firebase from 'firebase/app';

export interface PlayerComment {
    createdAt: firebase.firestore.Timestamp;
    id: string;
    uid: string;
    playerId: string;
    comment: string;
}