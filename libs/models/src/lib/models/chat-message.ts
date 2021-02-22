import * as firebase from 'firebase';

export interface ChatMessage {
  createdAt: firebase.default.firestore.FieldValue | firebase.default.firestore.Timestamp;
  id: string;
  user: {
    uid: string;
    firstname: string;
    lastname: string;
  };
  message: string;
}