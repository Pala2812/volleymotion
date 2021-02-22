import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ChatMessage } from '@volleymotion/models';
import { Observable, Subject } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';

import { StoreState } from '../../core/store/reducers';
import { UserSelectors } from '../../core/store/selectors';
import { ChatService } from '../shared/services/chat.service';

@Component({
  selector: 'vm-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  isLoading$ = new Subject<boolean>();
  messages$: Observable<ChatMessage[]>;

  constructor(
    private chatService: ChatService,
    private store: Store<StoreState>
  ) {}

  ngOnInit(): void {
    this.messages$ = this.chatService.getMessages().pipe(
      map((messages) => {
        return messages.sort(
          (a, b) => (a?.createdAt as any)?.toMillis() -  (b?.createdAt as any)?.toMillis()
        );
      })
    );
  }

  sendMessage(event: any) {
    this.isLoading$.next(true);
    this.store
      .pipe(
        select(UserSelectors.selectUser),
        finalize(() => this.isLoading$.next(false)),
        take(1)
      )
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
        this.chatService.addChatMessage(chatMessage);
      });
  }
}
