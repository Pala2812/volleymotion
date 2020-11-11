import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';

import { SharedModule } from '../shared/shared.module';
import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { SurveyDetailComponent } from './survey-detail/survey-detail.component';
import { SurveyCreateEditComponent } from './survey-create-edit/survey-create-edit.component';

@NgModule({
  declarations: [
    SurveyListComponent,
    SurveyDetailComponent,
    SurveyCreateEditComponent,
  ],
  imports: [CommonModule, SharedModule, QuillModule, SurveyRoutingModule],
  exports: [SurveyRoutingModule],
})
export class SurveyModule {}
