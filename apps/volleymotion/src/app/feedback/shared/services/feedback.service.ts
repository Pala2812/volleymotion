import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Feedback } from '@volleymotion/models';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(private fs: AngularFirestore) {}

  createFeedback(feedback: Feedback) {
    return from(this.fs.collection('feedback').doc(feedback.id).set(feedback));
  }

  getId() {
    return this.fs.createId();
  }
}
