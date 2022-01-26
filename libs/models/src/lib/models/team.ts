import { Meta } from '@volleymotion/models';

export interface Team {
  id: string;
  meta?: Meta;
  uid: string;
  name: string;
  teamType: string;
  sportType: string;
  division: string;
}
