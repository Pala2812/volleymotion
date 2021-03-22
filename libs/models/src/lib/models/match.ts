import * as firebase from 'firebase/app';
import { Address } from './address';
import { MatchSet } from './match-set';
import { PlayerParticipation } from './player-participation';

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
  playerParticipations: PlayerParticipation[];
  result: {
    sets: MatchSet[];
    setsWon: number;
    setsLost: number;
    scoredPoints: number;
    collectedPoints: number;
  };
}
