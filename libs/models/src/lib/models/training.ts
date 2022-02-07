import { Address, _geoloc } from '.';
import { Timestamp } from 'firebase/firestore';
export interface Training {
  uid: string;
  id: string;
  seasonId: string;
  teamId: string;
  weekday: number;
  day:
    | 'Montag'
    | 'Dienstag'
    | 'Mittwoch'
    | 'Donnerstag'
    | 'Freitag'
    | 'Samstag'
    | 'Sonntag';
  from: Timestamp;
  to: Timestamp;
  address: Address;
  _geoloc: _geoloc;
}
