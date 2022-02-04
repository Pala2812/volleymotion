import { Address, _geoloc } from '.';

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
  from: firebase.default.firestore.Timestamp;
  to: firebase.default.firestore.Timestamp;
  address: Address;
  _geoloc: _geoloc;
}
