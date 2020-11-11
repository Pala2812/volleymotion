import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Survey } from '../../core/models';
import { SurveyActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import { SurveySelectors } from '../../core/store/selectors';

@Component({
  selector: 'vm-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss'],
})
export class SurveyListComponent implements OnInit {
  isLoadingSurveys$: Observable<boolean>;
  surveys$: Observable<Survey[]>;

  constructor(private store: Store<StoreState>, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(SurveyActions.loadSurveys());
    this.isLoadingSurveys$ = this.store.pipe(
      select(SurveySelectors.selectIsLoadingSurveys)
    );
    this.surveys$ = this.store.pipe(select(SurveySelectors.selectSurveys));
  }

  viewDetail(survey: Survey) {
    this.router.navigate([`umfragen/detail/${survey.id}`]);
  }

  likeSurvey(survey: Survey) {
    this.store.dispatch(SurveyActions.likeSurvey({id: survey.id}));
  }
}
