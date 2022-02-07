import { Timestamp, FieldValue } from 'firebase/firestore';

export interface ChatMessage {
  createdAt: FieldValue | Timestamp;
  id: string;
  user: {
    uid: string;
    firstname: string;
    lastname: string;
  };
  message: string;
  isReply?: boolean;
}
