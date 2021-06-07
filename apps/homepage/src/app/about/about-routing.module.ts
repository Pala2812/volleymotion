import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { AboutSeoResolver } from './shared/resolvers/about-seo.resolver';

const routes: Routes = [
  { path: '', component: AboutComponent, resolve: [AboutSeoResolver] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutRoutingModule {}
