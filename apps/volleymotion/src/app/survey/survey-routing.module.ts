import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyCreateEditComponent } from './survey-create-edit/survey-create-edit.component';
import { SurveyDetailComponent } from './survey-detail/survey-detail.component';
import { SurveyListComponent } from './survey-list/survey-list.component';

const routes: Routes = [
  { path: 'liste', component: SurveyListComponent },
  { path: 'detail/:id', component: SurveyDetailComponent },
  { path: 'erstellen', component: SurveyCreateEditComponent },
  { path: '', redirectTo: 'liste', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyRoutingModule {}
