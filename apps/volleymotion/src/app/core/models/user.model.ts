import { Timestamp } from 'firebase/firestore';

import { UserInfo } from './user-info';
import { UserAddress } from './user-address';
import { UserPreferences } from './user-preferences.model';
export interface User {
  uid: string;
  createdAt: Timestamp;
  email: string;
  firstname: string;
  lastname: string;
  address: UserAddress;
  birthday: number;
  userInfo: UserInfo;
  userPreferences: UserPreferences;
}
