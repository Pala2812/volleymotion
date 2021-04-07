import { AuthEffects } from './auth/auth.effects';
import { UserEffects } from './user/user.effects';
import { SurveyEffects } from './article/article.effects';
import { TeamEffects } from './team/team.effects';
import { SeasonEffects } from './season/season.effects';
import { PlayerEffects } from './player/player.effects';
import { MatchEffects } from './match/match.effects';
import { TrainingMatchEffects } from './training-match/training-match.effects';
import { TagEffects } from './tag/tag.effects';
import { ExerciseEffects } from './exercise/exercise.effects';

export const effects: any[] = [
  AuthEffects,
  UserEffects,
  SurveyEffects,
  TeamEffects,
  SeasonEffects,
  PlayerEffects,
  MatchEffects,
  TrainingMatchEffects,
  TagEffects,
  ExerciseEffects,
];
