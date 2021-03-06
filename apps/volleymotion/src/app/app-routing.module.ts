import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { SeasonGuard } from './core/guards/season.guard';
import { TeamGuard } from './core/guards/team.guard';
import { HomeComponent } from './core/layout/home/home.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'mannschaften',
        loadChildren: () =>
          import('./teams/teams.module').then((m) => m.TeamsModule),
      },
      {
        path: 'saisons',
        canActivate: [TeamGuard],
        loadChildren: () =>
          import('./season/season.module').then((m) => m.SeasonModule),
      },
      {
        path: 'training',
        canActivate: [TeamGuard, SeasonGuard],
        loadChildren: () =>
          import('./training/training.module').then((m) => m.TrainingModule),
      },
      {
        path: 'spieltage',
        canActivate: [TeamGuard, SeasonGuard],
        loadChildren: () =>
          import('./matches/matches.module').then((m) => m.MatchesModule),
      },
      {
        canActivate: [TeamGuard, SeasonGuard],
        path: 'spieler',
        loadChildren: () =>
          import('./players/players.module').then((m) => m.PlayersModule),
      },
      {
        path: 'trainingsspiele',
        loadChildren: () =>
          import('./training-matches/training-matches.module').then(
            (m) => m.TrainingMatchesModule
          ),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('./chat/chat.module').then((m) => m.ChatModule),
      },
      {
        path: 'tags',
        loadChildren: () => import('./tags/tags.module').then(m => m.TagsModule)
      },
      {
        path: 'feedback',
        loadChildren: () => import('./feedback/feedback.module').then(m => m.FeedbackModule)
      },
      {
        path: 'analyse',
        loadChildren: () => import('./analyse/analyse.module').then(m => m.AnalyseModule)
      }
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./sign-up/sign-up.module').then((m) => m.SignUpModule),
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {
    path: 'impressum',
    loadChildren: () =>
      import('./impressum/impressum.module').then((m) => m.ImpressumModule),
  },
  {
    path: 'datenschutz',
    loadChildren: () =>
      import('./data-privacy/data-privacy.module').then(
        (m) => m.DataPrivacyModule
      ),
  },
];
@NgModule({
  imports: [DashboardModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
