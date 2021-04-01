import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';

import { SharedModule } from '../shared/shared.module';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleCreateEditComponent } from './article-create-edit/article-create-edit.component';

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleDetailComponent,
    ArticleCreateEditComponent,
  ],
  imports: [CommonModule, SharedModule, QuillModule, ArticleRoutingModule],
  exports: [ArticleRoutingModule],
})
export class ArticleModule { }
