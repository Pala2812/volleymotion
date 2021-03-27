import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Season, Tag } from '@volleymotion/models';
import { Observable, Subject } from 'rxjs';
import { map, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { SeasonActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import { SeasonSelectors, TagSelectors } from '../../core/store/selectors';

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
  tags$: Observable<Tag[]>;
  filteredTags$: Observable<Tag[]>;
  unsubscribe$ = new Subject();

  constructor(
    private store: Store<StoreState>,
    private route: ActivatedRoute,
    private actions$: Actions,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.initForm();
    this.isUpdatingSeason$ = this.store.pipe(
      select(SeasonSelectors.selectIsUpdatingSeason)
    );
    this.tags$ = this.store.select(TagSelectors.selectTags);
    this.filteredTags$ = this.store.select(TagSelectors.selectTags);

    this.route.params.subscribe((params) => {
      const id = params.id;
      this.id = id;
      this.teamId = params.teamId;
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
        withLatestFrom(this.route.queryParams),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((params) => {
        const redirectUrl = params[1]?.redirectUrl;
        const url = redirectUrl ?? `saisons/${this.teamId}`;
        this.router.navigate([url]);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initForm(season?: Season) {
    return this.formBuilder.group({
      goal: season?.goal ?? '',
      tags: this.formBuilder.array(season?.tags ?? []),
    });
  }

  get goal() {
    return this.form.controls.goal;
  }

  get tags() {
    return this.form.controls.tags as FormArray;
  }

  onTagClicked(event: any) {
    const tag = event.option.value;
    (this.form.controls.tags as FormArray).push(new FormControl(tag));
  }

  removeTag(index: number, event: Event) {
    (this.form.controls.tags as FormArray).removeAt(index);
    event.stopImmediatePropagation();
  }

  onInputChanged(event: any) {
    const filter = event?.value;
    this.filteredTags$ = this.tags$.pipe(
      map((tags) =>
        [...tags].filter((tag) => tag.name.toLowerCase().includes(event.value))
      )
    );
  }

  submit(form: FormGroup) {
    if (form.valid) {
      const goal = form.controls.goal.value;
      const tags = form.controls.tags.value;
      const season = { ...this.season, goal, tags };
      this.store.dispatch(SeasonActions.updateSeason({ season }));
    }
  }
}
