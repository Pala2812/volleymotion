import * as firebase from 'firebase/app';

export interface Team {
  id: string;
  createdAt: firebase.default.firestore.FieldValue;
  uid: string;
  club: string;
  name: string;
  teamType: string;
  sportType: string;
  division: string;
}
