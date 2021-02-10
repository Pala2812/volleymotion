import { Address } from './address';
import { Contact } from './contact';
import { _geoloc } from './_geoloc';

export interface TrainingMatch {
  id: string;
  uid: string;
  teamId: string;
  club: string;
  name: string;
  sportType: string;
  teamType: string;
  division: string;
  address: Address;
  _geoloc: _geoloc;
  contact: Contact;
  description: string;
}
