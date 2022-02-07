import { Exercise, Player, VideoTraining } from '.';
import { Timestamp } from 'firebase/firestore';

export interface TrainingUnit {
  id: string;
  uid: string;
  seasonId: string;
  teamId: string;
  trainingId: string,
  date: Timestamp;
  admins: string[];
  participantIds: string[];
  description?: string;
  exerciseIds: string[];
  videoTrainingIds: string[];
}
