import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Address, Team } from '@volleymotion/models';
import { object } from 'firebase-functions/lib/providers/storage';

import { Observable } from 'rxjs';
import { StoreState } from '../../core/store/reducers';
import { TeamSelectors } from '../../core/store/selectors';

@Component({
  selector: 'vm-traning-matches-create',
  templateUrl: './traning-matches-create.component.html',
  styleUrls: ['./traning-matches-create.component.scss'],
})
export class TraningMatchesCreateComponent implements OnInit {
  form: FormGroup;
  team$: Observable<Team>;

  constructor(private store: Store<StoreState>) {}

  ngOnInit(): void {
    this.form = this.initForm();

    this.store.pipe(select(TeamSelectors.selectTeam)).subscribe((team) => {
      this.form = this.initForm(team);
      this.disableControls();
    });
  }

  initForm(team?: Team) {
    const form = new FormGroup({
      club: new FormControl(team?.club ?? ''),
      name: new FormControl(team?.name),
      sportType: new FormControl(team?.sportType ?? ''),
      teamType: new FormControl(team?.teamType ?? ''),
      division: new FormControl(team?.division ?? ''),
      address: new FormGroup({
        street: new FormControl(''),
        streetnumber: new FormControl(''),
        postalcode: new FormControl(''),
        locality: new FormControl(''),
        administrativeArea: new FormControl(''),
      }),
      _geoloc: new FormGroup({
        lat: new FormControl(''),
        lng: new FormControl(''),
      }),
      description: new FormControl(''),
      email: new FormControl(''),
      telefon: new FormControl(''),
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

  submit(form: FormGroup) {
    console.log(form.value);
    if (form.valid) {
    }
  }

  onAddressSelected({ address, geometry }) {
    Object.keys(address).forEach((key) => {
      this.address?.controls[key]?.patchValue(address[key]);
    });

    Object.keys(geometry).forEach((key) => {
      this._geoloc?.controls[key]?.patchValue(geometry[key]);
    });
  }
}
