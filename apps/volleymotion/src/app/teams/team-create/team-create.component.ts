import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Team } from '@volleymotion/models';
import { User } from '../../core/models';
import { StoreState } from '../../core/store/reducers';
import * as firebase from 'firebase/app';
import { TeamActions } from '../../core/store/actions';
import { Observable, Subject } from 'rxjs';
import { TeamSelectors, UserSelectors } from '../../core/store/selectors';
import { Actions, ofType } from '@ngrx/effects';
import { filter, takeUntil } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { selectTeam } from '../../core/store/selectors/team/team.selectors';
@Component({
  selector: 'vm-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.scss'],
})
export class TeamCreateComponent implements OnInit {
  isCreatingTeam$: Observable<boolean>;
  unsubscribe$ = new Subject();
  form: FormGroup;
  user: User;
  id: string;
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
  ];

  constructor(
    private store: Store<StoreState>,
    private router: Router,
    private actions$: Actions,
    private route: ActivatedRoute,
    private fs: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.form = this.initForm();

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
        filter((team) => !!team),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((team) => (this.form = this.initForm(team), console.log(team) ));

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
      club: new FormControl(team?.club ?? '', [Validators.required]),
      name: new FormControl(team?.name ?? '', [Validators.required]),
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
    if (form.valid) {
      const id = this.id ?? this.fs.createId();
      const uid = this.user.uid;
      const createdAt = firebase.default.firestore.FieldValue.serverTimestamp();
      const club = form.controls.club.value;
      const name = form.controls.name.value;
      const division = form.controls.division.value;

      const team: Team = {
        id,
        uid,
        createdAt,
        club,
        name,
        division,
      };
      const action = TeamActions.createTeam({ team });
      this.store.dispatch(action);
    }
  }
}
