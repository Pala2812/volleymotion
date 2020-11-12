import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthActions } from '../../store/actions';

import { StoreState } from '../../store/reducers';
import { AuthSelectors } from '../../store/selectors';

@Component({
  selector: 'vm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  uid$: Observable<string>;
  isMenuVisible = false;

  constructor(private store: Store<StoreState>) {}

  ngOnInit(): void {
    this.uid$ = this.store.pipe(select(AuthSelectors.selectUid));
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  closeMenu() {
    this.isMenuVisible = false;
  }

  logout() {
    this.store.dispatch(AuthActions.signOut());
    this.toggleMenu();
  }
}
