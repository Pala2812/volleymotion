import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserCreateComponent } from './user-create/user-create.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UserCreateComponent],
  imports: [CommonModule, SharedModule, UserRoutingModule],
})
export class UserModule {}
