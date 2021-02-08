import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ChatMessage } from '@volleymotion/models';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { StoreState } from '../../core/store/reducers';
import { UserSelectors } from '../../core/store/selectors';
import { ChatService } from '../shared/services/chat.service';

@Component({
  selector: 'vm-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  messages$: Observable<ChatMessage[]>;

  constructor(
    private chatService: ChatService,
    private store: Store<StoreState>
  ) {}

  ngOnInit(): void {
    this.messages$ = this.chatService.getMessages();
  }

  sendMessage(event: any) {
    this.store
      .pipe(select(UserSelectors.selectUser), take(1))
      .subscribe((userObj) => {
        const { firstname, lastname, uid } = userObj;
        const user = { firstname, lastname, uid };
        const id = this.chatService.getId();
        const message = event.message;
        const createdAt = this.chatService.getTimestamp();

        const chatMessage: ChatMessage = {
          id,
          user,
          message,
          createdAt,
        };

        console.log(chatMessage);
        this.chatService.addChatMessage(chatMessage);
      });
  }
}
