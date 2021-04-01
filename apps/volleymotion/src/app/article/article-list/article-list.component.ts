import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Article } from '../../core/models';
import { SurveyActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import { AuthSelectors, SurveySelectors } from '../../core/store/selectors';
import { AuthDialogComponent } from '../../shared/components/auth-dialog/auth-dialog.component';

@Component({
  selector: 'vm-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  isLoadingSurveys$: Observable<boolean>;
  isReportingSurvey$: Observable<boolean>;
  isLikingSurvey$: Observable<boolean>;
  uid$: Observable<string>;
  articles$: Observable<Article[]>;

  constructor(
    private store: Store<StoreState>,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(SurveyActions.loadSurveys());
    this.isLoadingSurveys$ = this.store.pipe(select(SurveySelectors.selectIsLoadingSurveys));
    this.isLikingSurvey$ = this.store.pipe(select(SurveySelectors.selectIsLikingSurvey));
    this.isReportingSurvey$ = this.store.pipe(select(SurveySelectors.selectIsReportingSurvey));
    this.articles$ = this.store.pipe(select(SurveySelectors.selectSurveys));
    this.uid$ = this.store.pipe(select(AuthSelectors.selectUid));
  }

  viewDetail(article: Article) {
    this.router.navigate([`artikel/detail/${article.id}`]);
  }

  likeSurvey(article: Article, event: Event) {
    this.store
      .pipe(select(AuthSelectors.selectUid))
      .pipe(take(1))
      .subscribe((uid) => {
        if (!uid) {
          return this.dialog.open(AuthDialogComponent);
        }
        this.store.dispatch(SurveyActions.likeSurvey({ id: article.id }));
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
        this.router.navigate(['artikel/erstellen']);
      });
  }

  reportSurvey(article: Article, event: Event) {
    this.store
      .pipe(select(AuthSelectors.selectUid))
      .pipe(take(1))
      .subscribe((uid) => {
        if (!uid) {
          return this.dialog.open(AuthDialogComponent);
        }
        this.store.dispatch(SurveyActions.reportSurvey({ id: article.id }));
        event.stopImmediatePropagation();
      });
  }

  editSurvey(article: Article, event: Event) {
    this.router.navigate([`artikel/bearbeiten/${article.id}`]);
    event.stopImmediatePropagation();
  }
}
