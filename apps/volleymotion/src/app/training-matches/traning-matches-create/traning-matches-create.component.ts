import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Address, Team, Contact, TrainingMatch } from '@volleymotion/models';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TraningMatchActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import { TeamSelectors } from '../../core/store/selectors';

@Component({
  selector: 'vm-traning-matches-create',
  templateUrl: './traning-matches-create.component.html',
  styleUrls: ['./traning-matches-create.component.scss'],
})
export class TraningMatchesCreateComponent implements OnInit {
  form: FormGroup = this.initForm();
  team: Team | undefined;
  unsubscribe$ = new Subject();

  constructor(
    private store: Store<StoreState>,
    private fs: AngularFirestore,
    private actions$: Actions,
    private router: Router,
    private toastService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(select(TeamSelectors.selectTeam), takeUntil(this.unsubscribe$))
      .subscribe((team) => {
        this.form = this.initForm(team);
        this.team = team;
        this.disableControls();
      });

    this.actions$
      .pipe(
        ofType(TraningMatchActions.createTrainingMatchSuccess),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.toastService.success('Traningsspiel wurd erstellt!', 'Erstellt');
        this.router.navigate(['trainingsspiele']);
      });
  }

  initForm(team?: Team) {
    const form = new FormGroup({
      name: new FormControl(team?.name),
      sportType: new FormControl(team?.sportType ?? ''),
      teamType: new FormControl(team?.teamType ?? ''),
      division: new FormControl(team?.division ?? ''),
      address: new FormGroup({
        street: new FormControl('', [Validators.required]),
        streetnumber: new FormControl('', [Validators.required]),
        postalcode: new FormControl('', [Validators.required]),
        locality: new FormControl('', [Validators.required]),
        administrativeArea: new FormControl('', [Validators.required]),
      }),
      _geoloc: new FormGroup({
        lat: new FormControl('', [Validators.required]),
        lng: new FormControl('', [Validators.required]),
      }),
      description: new FormControl(''),
      contact: new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        telefon: new FormControl(''),
      }),
    });
    return form;
  }

  disableControls() {
    this.club.disable();
    this.name.disable();
    this.sportType.disable();
    this.teamType.disable();
    this.division.disable();
    this.address.disable();
    this._geoloc.disable();
  }

  get club() {
    return this.form.controls.club;
  }

  get name() {
    return this.form.controls.name;
  }

  get sportType() {
    return this.form.controls.sportType;
  }

  get teamType() {
    return this.form.controls.teamType;
  }

  get division() {
    return this.form.controls.division;
  }

  get address() {
    return this.form.controls.address as FormGroup;
  }

  get _geoloc() {
    return this.form.controls._geoloc as FormGroup;
  }

  get contact() {
    return this.form.controls.contact as FormGroup;
  }

  submit(form: FormGroup, team: Team) {
    form.markAllAsTouched();
    if (form.valid) {
      const id = this.fs.createId();
      const teamId = team.id;
      const uid = team.uid;
      const club = form.controls.club.value;
      const name = form.controls.name.value;
      const sportType = form.controls.sportType.value;
      const teamType = form.controls.teamType.value;
      const division = form.controls.division.value;

      const address = form.controls.address.value;
      const _geoloc = form.controls._geoloc.value;
      const contact = form.controls.contact.value;
      const description = form.controls.description.value;

      const trainingMatch: TrainingMatch = {
        id,
        teamId,
        uid,
        club,
        name,
        sportType,
        teamType,
        division,
        address,
        _geoloc,
        contact,
        description,
      };

      this.store.dispatch(
        TraningMatchActions.createTrainingMatch({ trainingMatch })
      );
    }
  }

  onAddressSelected({ address, geometry }: { address: any; geometry: any }) {
    Object.keys(address).forEach((key) => {
      this.address?.controls[key]?.patchValue(address[key]);
    });

    Object.keys(geometry).forEach((key) => {
      this._geoloc?.controls[key]?.patchValue(geometry[key]);
    });
  }
}
