import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Season } from '@volleymotion/models';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { SeasonActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import { SeasonSelectors } from '../../core/store/selectors';

@Component({
  selector: 'vm-season-edit',
  templateUrl: './season-edit.component.html',
  styleUrls: ['./season-edit.component.scss'],
})
export class SeasonEditComponent implements OnInit, OnDestroy {
  isUpdatingSeason$: Observable<boolean>;
  form: FormGroup;
  season: Season;
  id: string;
  teamId: string;
  unsubscribe$ = new Subject();

  constructor(
    private store: Store<StoreState>,
    private route: ActivatedRoute,
    private actions$: Actions,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.initForm();
    // this.isUpdatingSeason$ = this.store.pipe(select(SeasonSelectors.selectIsUpdatingSeason));

    this.route.params.subscribe((params) => {
      const id = params.id;
      this.id = id;
      this.teamId = params.teamId;
      this.store.dispatch(SeasonActions.setSeason({ season: undefined }));
      this.store.dispatch(SeasonActions.loadSeasonById({ id }));
    });

    this.store
      .pipe(select(SeasonSelectors.selectSeason), takeUntil(this.unsubscribe$))
      .subscribe((season) => {
        this.season = season;
        this.form = this.initForm(season);
      });

    this.actions$
      .pipe(
        ofType(SeasonActions.updateSeasonSuccess),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => this.router.navigate([`saisons/${this.teamId}`]));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initForm(season?: Season) {
    return new FormGroup({
      goal: new FormControl(season?.goal ?? '', [Validators.required]),
      tags: new FormArray(season?.tags ?? [], []),
    });
  }

  get goal() {
    return this.form.controls.goal;
  }

  get tags() {
    return this.form.controls.tags;
  }

  submit(form: FormGroup) {
    console.log(this.season);
    if (form.valid) {
      const goal = form.controls.goal.value;
      const season = { ...this.season, goal };
      this.store.dispatch(SeasonActions.updateSeason({ season }));
    }
  }
}
