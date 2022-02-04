import { Exercise, Player, VideoTraining } from '.';

export interface TrainingUnit {
  id: string;
  uid: string;
  seasonId: string;
  teamId: string;
  trainingId: string,
  date: firebase.default.firestore.Timestamp;
  participantIds: Player[];
  description?: string;
  exerciseIds: Exercise[];
  videoTrainingIds: VideoTraining[];
}
