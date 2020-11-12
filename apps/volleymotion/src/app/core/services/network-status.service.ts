import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkStatusService {
  constructor() {}

  init() {
    fromEvent(window, 'offline').subscribe(() => {
      document.getElementsByTagName('html')[0].classList.add('offline');
    });
    fromEvent(window, 'online').subscribe(() => {
      document.getElementsByTagName('html')[0].classList.remove('offline');
    });
  }
}
