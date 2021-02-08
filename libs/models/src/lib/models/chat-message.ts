import * as firebase from 'firebase';

export interface ChatMessage {
  createdAt: firebase.default.firestore.FieldValue;
  id: string;
  user: {
    uid: string;
    firstname: string;
    lastname: string;
  };
  message: string;
}
