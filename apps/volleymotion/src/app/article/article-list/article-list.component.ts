import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { select, Store } from '@ngrx/store';
import { Tag } from '@volleymotion/models';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Article } from '../../core/models';
import { SurveyActions } from '../../core/store/actions';
import { loadSurveys } from '../../core/store/actions/article/article.actions';
import { StoreState } from '../../core/store/reducers';
import { AuthSelectors, SurveySelectors, UserSelectors } from '../../core/store/selectors';
import { AuthDialogComponent } from '../../shared/components/auth-dialog/auth-dialog.component';
import { ArticleListFilterDialogComponent } from './article-list-filter-dialog/article-list-filter-dialog.component';

@Component({
  selector: 'vm-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  isLoadingSurveys$: Observable<boolean> | undefined;
  isReportingSurvey$: Observable<boolean> | undefined;
  isLikingSurvey$: Observable<boolean> | undefined;
  isEditor$: Observable<boolean> | undefined;
  uid$: Observable<string | undefined> | undefined;
  tags: Tag[] = [];
  filteredArticles$: Observable<Article[]> | undefined;
  articles$: Observable<Article[]> | undefined;
  sportType = 'Allgemein';

  constructor(
    private store: Store<StoreState>,
    private router: Router,
    private dialog: NbDialogService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(
      SurveyActions.loadSurveys({ sportType: this.sportType })
    );
    this.isLoadingSurveys$ = this.store.pipe(
      select(SurveySelectors.selectIsLoadingSurveys)
    );
    this.isLikingSurvey$ = this.store.pipe(
      select(SurveySelectors.selectIsLikingSurvey)
    );
    this.isReportingSurvey$ = this.store.pipe(
      select(SurveySelectors.selectIsReportingSurvey)
    );
    this.articles$ = this.store.pipe(select(SurveySelectors.selectSurveys));
    this.filteredArticles$ = this.store.pipe(
      select(SurveySelectors.selectSurveys)
    );
    this.isEditor$ = this.store.pipe(select(UserSelectors.selectIsEditor));
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

  showFilterDialog() {
    const ref = this.dialog.open(ArticleListFilterDialogComponent, {
      context: { tags: this.tags, sportType: this.sportType },
    });

    ref.onClose.subscribe(
      (data: { sportType: string; tags: undefined | Tag[] } | 'reset') => {
        if (!this.articles$) {
          return;
        }

        if (data === 'reset') {
          this.filteredArticles$ = this.articles$;
          return;
        }

        this.tags = (data.tags as Tag[]) ?? [];
        this.sportType = data.sportType;
        const tagIds = this.tags.map((tag) => tag.id);

        this.store.dispatch(loadSurveys({ tagIds, sportType: data.sportType }));
        this.articles$ = this.store.pipe(select(SurveySelectors.selectSurveys));
      }
    );
  }

  editSurvey(article: Article, event: Event) {
    this.router.navigate([`artikel/bearbeiten/${article.id}`]);
    event.stopImmediatePropagation();
  }
}
