import { Pipe, PipeTransform } from '@angular/core';
import * as firebase from 'firebase/app';
@Pipe({
  name: 'timestamp',
})
export class TimestampPipe implements PipeTransform {
  transform(value: firebase.default.firestore.Timestamp): unknown {
    return new Date(value.seconds);
  }
}
