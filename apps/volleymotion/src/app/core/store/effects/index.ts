import { AuthEffects } from './auth/auth.effects';
import { UserEffects } from './user/user.effects';
import { SurveyEffects } from './survey/survey.effects';

export const effects: any[] = [AuthEffects, UserEffects, SurveyEffects];
