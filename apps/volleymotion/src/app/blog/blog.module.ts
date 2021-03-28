import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogHomeComponent } from './blog-home/blog-home.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [BlogHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    BlogRoutingModule
  ],
  exports: [
    BlogRoutingModule
  ]
})
export class BlogModule { }
