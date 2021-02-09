import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagCreateComponent } from './tag-create/tag-create.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TagListComponent, TagCreateComponent],
  imports: [CommonModule, SharedModule, TagsRoutingModule],
  exports: [TagsRoutingModule],
})
export class TagsModule {}
