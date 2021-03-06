import firebase from 'firebase/app';

export interface ChatMessage {
  createdAt: firebase.firestore.FieldValue | firebase.firestore.Timestamp;
  id: string;
  user: {
    uid: string;
    firstname: string;
    lastname: string;
  };
  message: string;
  isReply?: boolean;
}