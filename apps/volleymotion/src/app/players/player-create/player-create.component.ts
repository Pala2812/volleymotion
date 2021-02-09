import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Player, Team } from '@volleymotion/models';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlayerActions } from '../../core/store/actions';

import { StoreState } from '../../core/store/reducers';
import { TeamSelectors } from '../../core/store/selectors';

@Component({
  selector: 'vm-player-create',
  templateUrl: './player-create.component.html',
  styleUrls: ['./player-create.component.scss'],
})
export class PlayerCreateComponent implements OnInit, OnDestroy {
  team$: Observable<Team>;
  unsubscribe$ = new Subject();
  form: FormGroup;
  positions = [
    'Außenangreifer',
    'Diagonalangreifer',
    'Mittelblocker',
    'Zuspieler',
    'Libero',
  ];

  constructor(
    private fs: AngularFirestore,
    private store: Store<StoreState>,
    private router: Router,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.form = this.initForm();
    this.team$ = this.store.pipe(select(TeamSelectors.selectTeam));

    this.actions$
      .pipe(
        ofType(PlayerActions.createPlayerSuccess),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => this.router.navigate(['spieler']));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initForm() {
    return new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
    });
  }

  submit(form: FormGroup, team: Team) {
    if (form.valid && team) {
      const id = this.fs.createId();
      const uid = team.uid;
      const teamId = team.id;
      const firstname = this.form.controls.firstname.value;
      const lastname = this.form.controls.lastname.value;
      const position = this.form.controls.position.value;

      const player: Player = {
        id,
        uid,
        teamId,
        firstname,
        lastname,
        position,
        strongIn: [],
        weakIn: [],
        improveIn: [],
      };

      this.store.dispatch(PlayerActions.createPlayer({ player }));
    }
  }
}
