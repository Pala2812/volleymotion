import { Timestamp } from 'firebase/firestore';

export interface PlayerComment {
  createdAt: Timestamp;
  id: string;
  uid: string;
  playerId: string;
  comment: string;
}
