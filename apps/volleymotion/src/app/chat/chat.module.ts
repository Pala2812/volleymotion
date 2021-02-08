import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbChatModule, NbLayoutModule } from '@nebular/theme';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat/chat.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbChatModule,
    SharedModule,
    ChatRoutingModule,
  ],
  exports: [ChatRoutingModule],
})
export class ChatModule {}
