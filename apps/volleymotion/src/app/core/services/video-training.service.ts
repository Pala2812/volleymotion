import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { VideoTraining } from '@volleymotion/models';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoTrainingService {
  constructor(private fs: AngularFirestore) {}

  createVideoTraining(videoTraining: VideoTraining) {
    return from(
      this.fs.doc(`video-training/${videoTraining.id}`).set(videoTraining)
    );
  }

  loadVideoTrainingList(sportType: string, tagIds?: string[]) {
    let ref = this.fs
      .collection<VideoTraining>('video-training')
      .ref.where('sportType', '==', sportType);

    if (tagIds?.length) {
      ref = ref.where('tagIds', 'array-contains-any', tagIds);
    }
    return from(ref.get().then((docs) => docs.docs.map((doc) => doc.data())));
  }

  getId() {
    return this.fs.createId();
  }
}
