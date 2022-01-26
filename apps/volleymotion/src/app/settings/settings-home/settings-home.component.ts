import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from '../../core/models';
import { StoreState } from '../../core/store/reducers';
import { UserSelectors } from '../../core/store/selectors';

@Component({
  selector: 'vm-settings-home',
  templateUrl: './settings-home.component.html',
  styleUrls: ['./settings-home.component.scss']
})
export class SettingsHomeComponent implements OnInit {
  user$: Observable<User | undefined> | undefined;

  constructor(private auth: AngularFireAuth, private store: Store<StoreState>) { }

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(UserSelectors.selectUser));
  }

  deleteAccount() {
    this.auth.user.pipe(take(1))
      .subscribe(user => {
        const deleteAccount = confirm('Möchtest du deinen Account und alle Daten wirklich löschen?')
        if (deleteAccount) {
          user?.delete()
            .then(() => alert('Dein Account und deine Daten würden gelöscht!'))
            .catch(error => alert(error.message));
        }
      });
  }

}
