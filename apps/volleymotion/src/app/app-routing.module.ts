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
        path: 'turniere',
        loadChildren: () =>
          import('./tournaments/tournaments.module').then(
            (m) => m.TournamentsModule
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
