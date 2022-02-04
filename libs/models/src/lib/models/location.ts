import { Address } from './address';
import { _geoloc } from './_geoloc';

export interface Location {
  uid: string;
  teamId: string;
  seasonId: string;
  address: Address;
  _geoloc: _geoloc;
}
