import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

import { UserInfo } from './user-info';
import { UserAddress } from './user-address';

export interface User {
  uid: string;
  email: string;
  firstname: string;
  lastname: string;
  address: UserAddress;
  birthday: Date | Timestamp;
  userInfo: UserInfo;
}
