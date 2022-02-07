import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Exercise } from '@volleymotion/models';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private fs: AngularFirestore) { }

  loadExercises() {
    return from(this.fs.collection('exercises').ref.get()
      .then(docs => docs.docs.map(doc => doc.data() as Exercise)));
  }

  createExercise(exercise: Exercise) {
    const id = this.fs.createId();
    return from(this.fs.collection('exercises').doc(id).set({ ...exercise, id }));
  }
}
