import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagCreateComponent } from './tag-create/tag-create.component';
import { TagListComponent } from './tag-list/tag-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'liste' },
  { path: 'liste', component: TagListComponent },
  { path: 'vorschlagen', component: TagCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagsRoutingModule {}
