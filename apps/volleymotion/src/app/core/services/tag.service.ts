import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Tag } from '@volleymotion/models';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private db: AngularFirestore) { }

  createTag(tag: Tag) {
    return from(this.db.collection('tags').doc(tag.id).set(tag));
  }

  loadTags() {
    return from(this.db.collection<Tag>('tags').valueChanges())
  }
}
