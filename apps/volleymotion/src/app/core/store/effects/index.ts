import { AuthEffects } from './auth/auth.effects';
import { UserEffects } from './user/user.effects';
import { SurveyEffects } from './survey/survey.effects';
import { TeamEffects } from './team/team.effects';
import { SeasonEffects } from './season/season.effects';
import { PlayerEffects } from './player/player.effects';

export const effects: any[] = [
  AuthEffects,
  UserEffects,
  SurveyEffects,
  TeamEffects,
  SeasonEffects,
  PlayerEffects,
];
