import firebase from 'firebase/app';

export interface MatchComment {
    createdAt: firebase.firestore.Timestamp;
    uid: string;
    id: string;
    matchId: string;
    comment: string;
}
