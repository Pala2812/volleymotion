import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/layout/home/home.component';

const routes: Routes = [
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
    component: HomeComponent,
    children: [
      {
        path: 'benutzer',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'turniere',
        loadChildren: () =>
          import('./tournaments/tournaments.module').then(
            (m) => m.TournamentsModule
          ),
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
        redirectTo: 'turniere',
        pathMatch: 'full',
      },
    ],
  },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
