import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/actions';

import { StoreState } from '../../store/reducers';

@Component({
  selector: 'vm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isMenuVisible = false;

  constructor(private store: Store<StoreState>) {}

  ngOnInit(): void {}

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  logout() {
    this.store.dispatch(AuthActions.signOut());
    this.toggleMenu();
  }
}
