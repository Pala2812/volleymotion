import { Exercise, Player, VideoTraining } from '.';
import { Timestamp } from 'firebase/firestore';

export interface TrainingUnit {
  id: string;
  uid: string;
  seasonId: string;
  teamId: string;
  trainingId: string,
  date: Timestamp;
  participantIds: Player[];
  description?: string;
  exerciseIds: Exercise[];
  videoTrainingIds: VideoTraining[];
}
