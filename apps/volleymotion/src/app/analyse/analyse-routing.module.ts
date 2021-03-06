import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyseComponent } from './analyse/analyse.component';

const routes: Routes = [
  { path: '', component: AnalyseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyseRoutingModule { }
