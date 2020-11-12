import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SwUpdate } from '@angular/service-worker';
import { Store } from '@ngrx/store';

import { AuthActions } from './core/store/actions';
import { StoreState } from './core/store/reducers';
import { NetworkStatusService } from './core/services/network-status.service';
@Component({
  selector: 'volleymotion-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'volleymotion';

  constructor(
    private auth: AngularFireAuth,
    private store: Store<StoreState>,
    private swUpdate: SwUpdate,
    private networkStatusService: NetworkStatusService
  ) {}

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      if (user) {
        this.store.dispatch(AuthActions.setUid({ uid: user.uid }));
      }
    });
    this.verifyAndUpdate();
    this.networkStatusService.init();
  }

  verifyAndUpdate() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      });
    }
  }
}
