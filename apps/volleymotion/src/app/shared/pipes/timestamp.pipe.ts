import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
@Pipe({
  name: 'timestamp',
})
export class TimestampPipe implements PipeTransform {
  transform(value: Timestamp): Date {
    return new Date(value?.seconds * 1000);
  }
}
