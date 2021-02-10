import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
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
      .subscribe(() => this.router.navigate(['spiele']));
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
    });
  }

  submit(form: FormGroup, season: Season) {
    const id = this.matchService.getId();
    const seasonId = season.id;
    const teamId = season.teamId;
    const uid = season.uid;
    const opponent = form.controls.opponent.value;
    const time = form.controls.time.value;
    const date = form.controls.date.value;

    const match: Match = {
      id,
      seasonId,
      teamId,
      uid,
      opponent,
      time,
      date,
    };

    console.log(match);

    this.store.dispatch(MatchActions.createMatch({ match }));
  }
}
