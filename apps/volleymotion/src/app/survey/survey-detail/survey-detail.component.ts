import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Survey } from '../../core/models';
import { SurveyActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import { SurveySelectors } from '../../core/store/selectors';

@Component({
  selector: 'vm-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.scss'],
})
export class SurveyDetailComponent implements OnInit {
  isLoadingSurvey$: Observable<boolean>;
  survey$: Observable<Survey>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<StoreState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params.id;
      this.store.dispatch(SurveyActions.loadSurveyById({ id }));
    });

    this.isLoadingSurvey$ = this.store.pipe(
      select(SurveySelectors.selectIsLoadingSurvey)
    );

    this.survey$ = this.store.pipe(select(SurveySelectors.selectSurvey));
  }

  likeSurvey() {
    this.survey$
      .pipe(take(1))
      .subscribe((survey) =>
        this.store.dispatch(SurveyActions.likeSurvey({ id: survey.id }))
      );
  }
}
