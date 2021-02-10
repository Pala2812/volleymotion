import * as firebase from 'firebase/app';
import { Address } from './address';

export interface Match {
  id: string;
  uid: string;
  teamId: string;
  seasonId: string;
  opponent: string;
  date: firebase.default.firestore.Timestamp;
  time: firebase.default.firestore.Timestamp;
  address: Address;
  status: 'Ausstehend' | 'Gewonnen' | 'Verloren';
  participatingPlayers: [];
  tags: [];
  comments: [];
  sets: {
    won: number;
    lost: number;
    total: number;
  };
}
