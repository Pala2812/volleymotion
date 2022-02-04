import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Season, Training } from '@volleymotion/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as firebase from 'firebase/app';

import { StoreState } from '../../core/store/reducers';
import { SeasonSelectors } from '../../core/store/selectors';
import { TrainingService } from '../../core/services/training.service';

@Component({
  selector: 'vm-training-create',
  templateUrl: './training-create.component.html',
  styleUrls: ['./training-create.component.scss'],
})
export class TrainingCreateComponent implements OnInit {
  form: FormGroup = this.initForm();
  season: Season | undefined;
  unsubscribe$ = new Subject();

  constructor(
    private store: Store<StoreState>,
    private trainingService: TrainingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.initForm();

    this.store
      .pipe(select(SeasonSelectors.selectSeason), takeUntil(this.unsubscribe$))
      .subscribe((season) => (this.season = season));

    /*
    this.route.params.subscribe((params) => {
      const { id } = params;
      this.store.dispatch(MatchActions.loadMatchById({ id }));
    });
      */
    /*
    this.match$
      ?.pipe(
        filter((season) => !!season),
        take(1)
      )
      .subscribe((match) => {
        this.form = this.initForm(match);
      });
      */
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initForm(training?: Training) {
    let from: Date | string = '';
    let to: Date | string = '';

    if (training?.to || training?.from) {
      from = new Date(training?.from?.seconds * 1000);
      to = new Date(training?.to?.seconds * 1000);
    }

    const form = new FormGroup({
      id: new FormControl(training?.id ?? ''),
      from: new FormControl(from, [Validators.required]),
      to: new FormControl(to, [Validators.required]),
      day: new FormControl('', [Validators.required]),
      address: new FormGroup({
        street: new FormControl(training?.address?.street ?? '', [
          Validators.required,
        ]),
        streetnumber: new FormControl(training?.address?.streetnumber ?? '', [
          Validators.required,
        ]),
        postalcode: new FormControl(training?.address?.postalcode ?? '', [
          Validators.required,
        ]),
        locality: new FormControl(training?.address?.locality ?? '', [
          Validators.required,
        ]),
        administrativeArea: new FormControl(
          training?.address?.administrativeArea ?? '',
          [Validators.required]
        ),
        country: new FormControl(training?.address?.country ?? '', [
          Validators.required,
        ]),
      }),
      _geoloc: new FormGroup({
        lat: new FormControl(training?._geoloc?.lat ?? '', [
          Validators.required,
        ]),
        lng: new FormControl(training?._geoloc?.lng ?? '', [
          Validators.required,
        ]),
      }),
    });

    form.get('_geoloc')?.disable();
    return form;
  }

  get address() {
    return this.form.controls.address as FormGroup;
  }

  get _geoloc() {
    return this.form.controls._geoloc as FormGroup;
  }

  submit(form: FormGroup, season: Season | undefined) {
    if (form.valid && season) {
      const id = !!form.controls.id.value
        ? form.controls.id.value
        : this.trainingService?.getId();
      const seasonId = season.id;
      const teamId = season.teamId;
      const uid = season.uid;
      const day = form.controls.day.value;
      const from = new Date(form.controls.from.value) as any;
      const to = new Date(form.controls.to.value) as any;
      const address = form.controls.address.value;
      const _geoloc = form.controls._geoloc.value;
      let weekday = 0;
      switch (day) {
        case 'Montag': {
          weekday = 1;
          break;
        }
        case 'Dienstag': {
          weekday = 2;
          break;
        }
        case 'Mittwoch': {
          weekday = 3;
          break;
        }
        case 'Donnerstag': {
          weekday = 4;
          break;
        }
        case 'Freitag': {
          weekday = 5;
          break;
        }
        case 'Samstag': {
          weekday = 6;
          break;
        }
        case 'Sonntag': {
          weekday = 7;
          break;
        }
      }

      const training: Training = {
        id,
        uid,
        seasonId,
        teamId,
        day,
        weekday,
        from,
        to,
        address,
        _geoloc,
      };

      /*  if (this.match$) {
        return this.store.dispatch(MatchActions.updateMatch({ match: match }));
      } */

      this.trainingService.create(training).subscribe(() => {
        this.router.navigate(['training']);
      });
      // this.store.dispatch(MatchActions.createMatch({ match }));
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
