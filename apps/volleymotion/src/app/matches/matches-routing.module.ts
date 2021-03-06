import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchCreateComponent } from './match-create/match-create.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { MatchListComponent } from './match-list/match-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'liste', pathMatch: 'fulll' },
  { path: 'liste', component: MatchListComponent },
  { path: 'erstellen', component: MatchCreateComponent },
  { path: 'bearbeiten/:id', component: MatchCreateComponent },
  { path: 'detail/:id', component: MatchDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchesRoutingModule { }
