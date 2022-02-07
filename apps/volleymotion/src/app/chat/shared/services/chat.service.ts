import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ChatMessage } from '@volleymotion/models';
import { serverTimestamp } from 'firebase/firestore';
@Injectable({
  providedIn: 'root',
})
export class ChatService {

  constructor(private fs: AngularFirestore) {}

  getMessages() {
    return this.fs.collection<ChatMessage>('messages').valueChanges();
  }

  addChatMessage(message: ChatMessage) {
    this.fs.collection('messages').doc(message.id).set(message);
  }

  getId() {
    return this.fs.createId();
  }

  getTimestamp() {
    return serverTimestamp();
  }
}
