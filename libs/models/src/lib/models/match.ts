import * as firebase from 'firebase/app';

export interface Match {
  id: string;
  uid: string;
  teamId: string;
  seasonId: string;
  opponent: string;
  date: firebase.default.firestore.Timestamp;
  time: any;
}
