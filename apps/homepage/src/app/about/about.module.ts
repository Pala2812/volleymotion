import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about/about.component';
import { AboutSeoResolver } from './shared/resolvers/about-seo.resolver';

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, AboutRoutingModule],
  exports: [AboutRoutingModule],
  providers: [AboutSeoResolver],
})
export class AboutModule {}
