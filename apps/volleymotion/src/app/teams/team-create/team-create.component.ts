import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Meta, Team, User } from '@volleymotion/models';
import { StoreState } from '../../core/store/reducers';
import * as firebase from 'firebase/app';
import { TeamActions } from '../../core/store/actions';
import { Observable, Subject } from 'rxjs';
import { TeamSelectors, UserSelectors } from '../../core/store/selectors';
import { Actions, ofType } from '@ngrx/effects';
import { filter, takeUntil, withLatestFrom } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'vm-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.scss'],
})
export class TeamCreateComponent implements OnInit {
  isCreatingTeam$: Observable<boolean> | undefined;
  unsubscribe$ = new Subject();
  form: FormGroup = this.initForm();
  user: User | undefined;
  id: string | undefined;
  title = 'Mannschaft erstellen';
  buttonText = 'Mannschaft erstellen';
  divisions = [
    '1. Bundesliga',
    '2. Bundensliga',
    '3. Liga',
    'Regionalliga',
    'Oberliga',
    'Verbandsliga',
    'Landesliga',
    'Bezirksliga',
    'Bezirksklasse',
    'Kreisliga',
    'Kreisklasse',
    'A-Cup',
    'B-Cup',
    'C-Cup',
    'D-Cup',
    'Jugend',
    'Senioren',
    'Hobby / Mixed',
  ];
  teamTypes = ['Damen', 'Herren', 'Jugend', 'Senioren', 'Hobby / Mixed'];
  sportTypes = ['Hallenvolleyball', 'Beachvolleyball', 'Snowvolleyball'];

  constructor(
    private store: Store<StoreState>,
    private router: Router,
    private actions$: Actions,
    private route: ActivatedRoute,
    private fs: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      if (this.id) {
        this.title = 'Mannschaft bearbeiten';
        this.buttonText = 'Mannschaft aktualisieren';
        this.store.dispatch(TeamActions.setTeam({ team: undefined }));
        this.store.dispatch(TeamActions.loadTeamById({ id: this.id }));
      }
    });

    this.store
      .pipe(
        select(TeamSelectors.selectTeam),
        withLatestFrom(this.route.params),
        filter((params) => !!params[0] && params[1].id),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((params) => (this.form = this.initForm(params[0])));

    this.store
      .pipe(
        select(UserSelectors.selectUser),
        filter((user) => !!user),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((user) => (this.user = user));

    this.isCreatingTeam$ = this.store.pipe(
      select(TeamSelectors.selectIsCreatingTeam)
    );

    this.actions$
      .pipe(ofType(TeamActions.createTeamSuccess), takeUntil(this.unsubscribe$))
      .subscribe(() => this.router.navigate(['mannschaften']));
  }

  initForm(team?: Team) {
    return new FormGroup({
      name: new FormControl(team?.name ?? '', [Validators.required]),
      sportType: new FormControl(team?.sportType ?? '', [Validators.required]),
      teamType: new FormControl(team?.teamType ?? '', [Validators.required]),
      division: new FormControl(team?.division ?? '', [Validators.required]),
    });
  }

  get name() {
    return this.form.controls.name;
  }

  get division() {
    return this.form.controls.division;
  }

  get club() {
    return this.form.controls.club;
  }

  submit(form: FormGroup) {
    if (form.valid && this.user?.uid) {
      const id = this.id ?? this.fs.createId();
      const uid = this.user.uid;
      const name = form.controls.name.value;
      const sportType = form.controls.sportType.value;
      const teamType = form.controls.teamType.value;
      const division = form.controls.division.value;

      const team: Team = {
        id,
        uid,
        name,
        sportType,
        teamType,
        division,
      };

      const action = TeamActions.createTeam({ team });
      this.store.dispatch(action);
    }
  }
}
