import { User } from '../user.model';
import { Timestamp } from 'firebase/firestore';
export interface SurveyComment {
  uid?: string;
  user?: User;
  surveyId: string;
  createdAt?: Timestamp;
  message: string;
}
