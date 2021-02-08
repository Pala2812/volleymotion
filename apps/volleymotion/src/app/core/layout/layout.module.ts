import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NbLayoutModule } from '@nebular/theme';
import { NbSidebarModule } from '@nebular/theme';

import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [HomeComponent, FooterComponent, HeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    NbLayoutModule,
    NbSidebarModule,
    MatToolbarModule,
    RouterModule,
  ],
  exports: [HomeComponent],
})
export class LayoutModule {}
