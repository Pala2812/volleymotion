import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Match, Season } from '@volleymotion/models';
import { isDate } from 'date-fns';
import * as firebase from 'firebase/app';
import { Observable, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { MatchService } from '../../core/services/match.service';
import { MatchActions, SeasonActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import { MatchSelectors, SeasonSelectors } from '../../core/store/selectors';

@Component({
  selector: 'vm-match-create',
  templateUrl: './match-create.component.html',
  styleUrls: ['./match-create.component.scss'],
})
export class MatchCreateComponent implements OnInit, OnDestroy {
  match$: Observable<Match | undefined> | undefined;
  form: FormGroup = this.initForm();
  season: Season | undefined;
  unsubscribe$ = new Subject();

  constructor(
    private store: Store<StoreState>,
    private matchService: MatchService,
    private actions$: Actions,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.match$ = this.store.pipe(select(MatchSelectors.selectMatch));
    this.form = this.initForm();

    this.store
      .pipe(select(SeasonSelectors.selectSeason), takeUntil(this.unsubscribe$))
      .subscribe((season) => (this.season = season));

    this.actions$
      .pipe(
        ofType(
          MatchActions.createMatchSuccess,
          MatchActions.updateMatchSuccess
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => this.router.navigate(['spieltage']));

    this.route.params.subscribe((params) => {
      const { id } = params;
      this.store.dispatch(MatchActions.loadMatchById({ id }));
    });

    this.match$
      ?.pipe(
        filter((season) => !!season),
        take(1)
      )
      .subscribe((match) => {
        this.form = this.initForm(match);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initForm(match?: Match) {
    let date: Date | string = '';
    let time: Date | string = '';

    if (match?.date) {
      date = new Date(match?.date.seconds * 1000);
      time = new Date(match?.date.seconds * 1000);
    }

    const form = new FormGroup({
      id: new FormControl(match?.id ?? ''),
      opponent: new FormControl(match?.opponent ?? '', [Validators.required]),
      date: new FormControl(date, [Validators.required]),
      time: new FormControl(time, [Validators.required]),
      address: new FormGroup({
        street: new FormControl(match?.address?.street ?? '', [
          Validators.required,
        ]),
        streetnumber: new FormControl(match?.address?.streetnumber ?? '', [
          Validators.required,
        ]),
        postalcode: new FormControl(match?.address?.postalcode ?? '', [
          Validators.required,
        ]),
        locality: new FormControl(match?.address?.locality ?? '', [
          Validators.required,
        ]),
        administrativeArea: new FormControl(
          match?.address?.administrativeArea ?? '',
          [Validators.required]
        ),
        country: new FormControl(match?.address?.country ?? '', [
          Validators.required,
        ]),
      }),
      _geoloc: new FormGroup({
        lat: new FormControl(match?._geoloc?.lat ?? '', [Validators.required]),
        lng: new FormControl(match?._geoloc?.lng ?? '', [Validators.required]),
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
        : this.matchService.getId();
      const seasonId = season.id;
      const teamId = season.teamId;
      const uid = season.uid;
      const opponent = form.controls.opponent.value;
      let time = new Date(form.controls.time.value);
      let matchDate = new Date(form.controls.date.value);
      const address = form.controls.address.value;
      const _geoloc = form.controls._geoloc.value;

      matchDate.setHours(time.getHours());
      matchDate.setMinutes(time.getMinutes());

      let date = firebase.default.firestore.Timestamp.fromDate(matchDate);
      const match: Partial<Match> = {
        id,
        seasonId,
        teamId,
        uid,
        opponent,
        address,
        date,
        _geoloc,
      };

      if (this.match$) {
        return this.store.dispatch(MatchActions.updateMatch({ match: match }));
      }

      this.store.dispatch(MatchActions.createMatch({ match }));
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
