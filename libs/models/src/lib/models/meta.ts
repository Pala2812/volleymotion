import { Timestamp } from 'firebase/firestore';

export interface Meta {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
