import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleCreateEditComponent } from './article-create-edit/article-create-edit.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleListComponent } from './article-list/article-list.component';


const routes: Routes = [
  { path: 'liste', component: ArticleListComponent },
  { path: 'detail/:id', component: ArticleDetailComponent },
  { path: 'bearbeiten/:id', component: ArticleCreateEditComponent },
  { path: 'erstellen', component: ArticleCreateEditComponent },
  { path: '', redirectTo: 'liste', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule { }
