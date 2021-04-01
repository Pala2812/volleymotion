import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import firebase from 'firebase/app';
import { QuillEditorComponent } from 'ngx-quill';
import { Observable, Subject } from 'rxjs';
import { filter, take, takeUntil, withLatestFrom } from 'rxjs/operators';

import { Article } from '../../core/models';
import { SurveyActions } from '../../core/store/actions';
import { loadSurveyById } from '../../core/store/actions/article/article.actions';
import { StoreState } from '../../core/store/reducers';
import { AuthSelectors, SurveySelectors } from '../../core/store/selectors';

@Component({
  selector: 'vm-article-create-edit',
  templateUrl: './article-create-edit.component.html',
  styleUrls: ['./article-create-edit.component.scss'],
})
export class ArticleCreateEditComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('quill') quill: ElementRef<QuillEditorComponent>;
  article$: Observable<Article>;
  isCreatingSurvey$: Observable<boolean>;
  uid$: Observable<string>;
  surveyForm: FormGroup;
  isEdit = false;

  private unsubscribe$ = new Subject();

  constructor(
    private store: Store<StoreState>,
    private actions: Actions,
    private router: Router,
    private route: ActivatedRoute,
    private fs: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.surveyForm = this.initSurveyForm();
    this.isCreatingSurvey$ = this.store.pipe(
      select(SurveySelectors.selectIsCreatingSurvey)
    );

    this.uid$ = this.store.pipe(select(AuthSelectors.selectUid));
    this.article$ = this.store.pipe(select(SurveySelectors.selectSurvey));

    this.route.params.subscribe((params) => {
      const id = params?.id;
      if (id) {
        this.isEdit = true;
        this.store.dispatch(loadSurveyById({ id }));
      }
    });
    this.navigateOnSuccess();
    this.showToastOnError();
  }

  ngAfterViewInit(): void {
    if (this.isEdit) {
      this.store
        .pipe(
          select(SurveySelectors.selectSurvey),
          filter((article) => !!article),
          take(1)
        )
        .subscribe((article) => {
          this.surveyForm = this.initSurveyForm(article);
          (this?.quill as any)?.writeValue(article?.description);
        });
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(SurveyActions.loadSurveyByIdSuccess({ article: undefined }));
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  showToastOnError() {
    this.actions
      .pipe(
        ofType(
          SurveyActions.createSurveyFailure,
          SurveyActions.updateSurveyFailure
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  navigateOnSuccess() {
    this.actions
      .pipe(
        ofType(
          SurveyActions.createSurveySuccess,
          SurveyActions.updateSurveySuccess
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => this.router.navigate(['artikel']));
  }

  initSurveyForm(article?: Article): FormGroup {
    return new FormGroup({
      title: new FormControl(article?.title || '', [Validators.required]),
      description: new FormControl(article?.description || '', [Validators.required]),
      summary: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    });
  }

  patchDescription(event: any) {
    this.surveyForm.controls.description.patchValue(event.html);
  }

  publish(form: FormGroup) {
    form.markAllAsTouched();
    if (form.valid) {
      this.uid$
        .pipe(withLatestFrom(this.article$), take(1))
        .subscribe((params) => {
          let article = params[1] || ({} as Article);
          article = { ...article, ...this.surveyForm.value };
          const id = params[1]?.id || this.fs.createId();
          article.id = id;
          article.uid = params[0];
          (article as any).createdAt = firebase.firestore.FieldValue.serverTimestamp();

          this.isEdit
            ? this.store.dispatch(SurveyActions.updateSurvey({ article }))
            : this.store.dispatch(SurveyActions.createSurvey({ article }));
        });
    }
  }
}
