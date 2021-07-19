import { Meta } from './meta';
import { role } from './types';

export interface User {
  uid: string;
  firstname: string;
  lastname: string;
  meta?: Meta;
  email: string;
  roles: role[];
}
