import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';

@Component({
  selector: 'vm-settings-home',
  templateUrl: './settings-home.component.html',
  styleUrls: ['./settings-home.component.scss']
})
export class SettingsHomeComponent implements OnInit {

  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void { }

  deleteAccount() {
    this.auth.user.pipe(take(1))
      .subscribe(user => {
        const deleteAccount = confirm('Möchtest du deinen Account und alle Daten wirklich löschen?')
        if (deleteAccount) {
          user.delete();
        }
      });
  }

}
