import firebase from 'firebase/app';

export interface Meta {
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}
