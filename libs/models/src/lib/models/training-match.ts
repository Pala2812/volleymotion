import { Address } from './address';
import { Contact } from './contact';

export interface TrainingMatch {
  id: string;
  uid: string;
  teamId: string;
  club: string;
  sportType: string;
  teamType: string;
  division: string;
  address: Address;
  contact: Contact;
}
