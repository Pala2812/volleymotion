import { Timestamp } from 'firebase/firestore';
import { Address } from './address';
import { MatchSet } from './match-set';
import { PlayerParticipation } from './player-participation';
import { _geoloc } from './_geoloc';

export interface Match {
  id: string;
  uid: string;
  teamId: string;
  seasonId: string;
  opponent: string;
  date: Timestamp;
  address: Address;
  _geoloc: _geoloc;
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
