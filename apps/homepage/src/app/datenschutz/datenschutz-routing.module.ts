import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';

const routes: Routes = [
  { path: '', component: DatenschutzComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatenschutzRoutingModule { }
