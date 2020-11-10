import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HomeComponent, FooterComponent, HeaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [HomeComponent],
})
export class LayoutModule {}
