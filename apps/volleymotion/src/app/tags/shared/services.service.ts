import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Tag, TagProposal } from '@volleymotion/models';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagProposalService {
  constructor(private fs: AngularFirestore) {}

  addTagProposal(tagProposal: any) {
    return from(
      this.fs.doc(`tag-proposals/${tagProposal.id}`).set(tagProposal)
    );
  }

  getTagProposals() {
    return this.fs.collection<TagProposal>('tag-proposals').valueChanges();
  }

  getTags() {
    return from(this.fs.collection<Tag>('tags').valueChanges());
  }

  getId() {
    return this.fs.createId();
  }
}
