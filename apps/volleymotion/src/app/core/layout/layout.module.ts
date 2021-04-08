import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NbLayoutModule, NbMenuModule } from '@nebular/theme';
import { NbSidebarModule } from '@nebular/theme';

import { HomeComponent } from './home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [HomeComponent, HeaderComponent, FooterComponent, CardComponent],
  imports: [
    CommonModule,
    SharedModule,
    NbLayoutModule,
    NbMenuModule,
    NbSidebarModule,
    MatToolbarModule,
    RouterModule,
  ],
  exports: [HomeComponent],
})
export class LayoutModule {}
