import { Timestamp, FieldValue } from 'firebase/firestore';

export interface MatchComment {
  createdAt: Timestamp | FieldValue;
  uid: string;
  id: string;
  matchId: string;
  comment: string;
}
