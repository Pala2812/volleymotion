import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Match, Season } from '@volleymotion/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatchService } from '../../core/services/match.service';
import { MatchActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import { SeasonSelectors } from '../../core/store/selectors';

@Component({
  selector: 'vm-match-create',
  templateUrl: './match-create.component.html',
  styleUrls: ['./match-create.component.scss'],
})
export class MatchCreateComponent implements OnInit, OnDestroy {
  form: FormGroup;
  season: Season;
  unsubscribe$ = new Subject();

  constructor(
    private store: Store<StoreState>,
    private matchService: MatchService,
    private actions$: Actions,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.initForm();

    this.store
      .pipe(select(SeasonSelectors.selectSeason), takeUntil(this.unsubscribe$))
      .subscribe((season) => (this.season = season));

    this.actions$
      .pipe(
        ofType(MatchActions.createMatchSuccess),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => this.router.navigate(['spieltage']));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initForm() {
    return new FormGroup({
      opponent: new FormControl(''),
      date: new FormControl(''),
      time: new FormControl(''),
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
    });
  }

  get address() {
    return this.form.controls.address as FormGroup;
  }

  get _geoloc() {
    return this.form.controls._geoloc as FormGroup;
  }

  submit(form: FormGroup, season: Season) {
    console.log(form);
    console.log(season);
    if (form.valid && season) {
      const id = this.matchService.getId();
      const seasonId = season.id;
      const teamId = season.teamId;
      const uid = season.uid;
      const opponent = form.controls.opponent.value;
      const time = form.controls.time.value;
      const date = form.controls.date.value;
      const address = form.controls.address.value;

      const match: Partial<Match> = {
        id,
        seasonId,
        teamId,
        uid,
        opponent,
        time,
        date,
        address,
      };

      console.log(match);

      this.store.dispatch(MatchActions.createMatch({ match }));
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
