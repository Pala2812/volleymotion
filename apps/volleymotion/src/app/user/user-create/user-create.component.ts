import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import { UserSelectors } from '../../core/store/selectors';

@Component({
  selector: 'vm-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  isUpdatingUser$: Observable<boolean>;
  userCreateForm: FormGroup;
  positionOptions = [
    'Zuspieler',
    'Außenangreifer',
    'Diagonalspieler',
    'Libero',
    'Trainer',
    'Co-Trainer',
    'Physiotherapeut',
    'Andere Tätigkeit',
    'Keine Angabe',
  ];
  isClubMemberOptions = [
    { key: 'Ich bin in einem Verein angemeldet/tätig', value: true },
    { key: 'Ich bin in keinem Verein angemeldet/tätig', value: false },
  ];

  private unsubscribe$ = new Subject();

  constructor(
    private store: Store<StoreState>,
    private actions$: Actions,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userCreateForm = this.initUserCreateFrom();

    this.actions$
      .pipe(ofType(UserActions.UpdateUserSuccess), takeUntil(this.unsubscribe$))
      .subscribe(() => this.router.navigate(['']));

    this.isUpdatingUser$ = this.store.pipe(
      select(UserSelectors.selectIsUpdatingUser)
    );
  }

  get userInfo() {
    return this.userCreateForm.controls.playerInfo as FormGroup;
  }

  get address() {
    return this.userCreateForm.controls.address as FormGroup;
  }

  initUserCreateFrom(): FormGroup {
    return new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      address: new FormGroup({
        postalCode: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5),
        ]),
      }),
      birthday: new FormControl('', [Validators.required]),
      userInfo: new FormGroup({
        isClubMember: new FormControl('', [Validators.required]),
        position: new FormControl('', [Validators.required]),
      }),
    });
  }

  save(form: FormGroup) {
    if (form.valid) {
      const user = form.value;
      this.store.dispatch(UserActions.UpdateUser({ user }));
    }
  }
}
