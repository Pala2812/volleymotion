import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/layout/home/home.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
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
        path: '',
        component: DashboardComponent,
        children: [
          {
            path: 'mannschaften',
            loadChildren: () =>
              import('./teams/teams.module').then((m) => m.TeamsModule),
          },
          {
            path: 'training',
            loadChildren: () =>
              import('./training/training.module').then(
                (m) => m.TrainingModule
              ),
          },
          {
            path: 'spiele',
            loadChildren: () =>
              import('./matches/matches.module').then((m) => m.MatchesModule),
          },
          {
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
        ],
      },
      {
        path: 'benutzer',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'die-mission',
        loadChildren: () =>
          import('./about/about.module').then((m) => m.AboutModule),
      },

      {
        path: 'umfragen',
        loadChildren: () =>
          import('./survey/survey.module').then((m) => m.SurveyModule),
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
      {
        path: '',
        redirectTo: 'umfragen',
        pathMatch: 'full',
      },
    ],
  },
];
@NgModule({
  imports: [DashboardModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
