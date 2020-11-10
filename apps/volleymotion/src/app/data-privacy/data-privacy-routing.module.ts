import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataPrivacyComponent } from './data-privacy/data-privacy.component';

const routes: Routes = [{ path: '', component: DataPrivacyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataPrivacyRoutingModule {}
