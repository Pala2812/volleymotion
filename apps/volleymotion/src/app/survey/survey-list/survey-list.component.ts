import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Survey } from '../../core/models';
import { SurveyActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import { AuthSelectors, SurveySelectors } from '../../core/store/selectors';
import { AuthDialogComponent } from '../../shared/components/auth-dialog/auth-dialog.component';

@Component({
  selector: 'vm-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss'],
})
export class SurveyListComponent implements OnInit {
  isLoadingSurveys$: Observable<boolean>;
  surveys$: Observable<Survey[]>;

  constructor(
    private store: Store<StoreState>,
    private router: Router,
    private dialog: MatDialog
  ) {}

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

  likeSurvey(survey: Survey, event: Event) {
    this.store
      .pipe(select(AuthSelectors.selectUid))
      .pipe(take(1))
      .subscribe((uid) => {
        if (!uid) {
          return this.dialog.open(AuthDialogComponent);
        }
        this.store.dispatch(SurveyActions.likeSurvey({ id: survey.id }));
        event.stopImmediatePropagation();
      });
  }

  createSurvey() {
    this.store
      .pipe(select(AuthSelectors.selectUid))
      .pipe(take(1))
      .subscribe((uid) => {
        if (!uid) {
          return this.dialog.open(AuthDialogComponent);
        }
        this.router.navigate(['umfragen/erstellen']);
      });
  }

  reportSurvey(survey: Survey, event: Event) {
    event.stopImmediatePropagation();
  }
}
