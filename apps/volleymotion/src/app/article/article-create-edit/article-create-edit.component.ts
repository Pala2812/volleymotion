import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Tag } from '@volleymotion/models';
import firebase from 'firebase/app';
import { QuillEditorComponent } from 'ngx-quill';
import { Observable, Subject } from 'rxjs';
import { filter, map, take, takeUntil, withLatestFrom } from 'rxjs/operators';

import { Article, User } from '../../core/models';
import { SurveyActions } from '../../core/store/actions';
import { loadSurveyById } from '../../core/store/actions/article/article.actions';
import { StoreState } from '../../core/store/reducers';
import { AuthSelectors, SurveySelectors, TagSelectors, UserSelectors } from '../../core/store/selectors';

@Component({
  selector: 'vm-article-create-edit',
  templateUrl: './article-create-edit.component.html',
  styleUrls: ['./article-create-edit.component.scss'],
})
export class ArticleCreateEditComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('quill') quill: ElementRef<QuillEditorComponent>;
  user$: Observable<User>;
  tags$: Observable<Tag[]>;
  filteredTags$: Observable<Tag[]>;
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


    this.user$ = this.store.pipe(select(UserSelectors.selectUser));
    this.article$ = this.store.pipe(select(SurveySelectors.selectSurvey));
    this.tags$ = this.store.pipe(select(TagSelectors.selectTags));
    this.filteredTags$ = this.store.pipe(select(TagSelectors.selectTags));

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

  get tags() {
    return this.surveyForm?.get('tags') as FormArray;
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

  filterTags(event: any) {
    const query = String(event.target.value).toLowerCase();

    if (!query) {
      this.filteredTags$ = this.tags$;
      return;
    }

    if (event.key === 'Backspace' || event.code === 'Backspace') {
      this.filteredTags$ = this.tags$;
    }

    this.filteredTags$ = this.filteredTags$.pipe(
      map(tags => tags.filter(tag => tag.name.toLowerCase().includes(query)))
    );
  }

  onTagAdded(event: any) {
    const tag = event.option.value;
    const control = new FormControl(tag);
    this.filteredTags$ = this.tags$;
    this.tags.push(control);
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  initSurveyForm(article?: Article): FormGroup {
    return new FormGroup({
      title: new FormControl(article?.title || '', [Validators.required]),
      tags: new FormArray([]),
      description: new FormControl(article?.description || '', [Validators.required]),
    });
  }

  patchDescription(event: any) {
    this.surveyForm.controls.description.patchValue(event.html);
  }

  publish(form: FormGroup, user: User) {
    form.markAllAsTouched();
    if (form.valid) {
      let article = form.value;

      const id = article.id || this.fs.createId();
      const tagIds = (form.value.tags as any[]).map(tag => tag.id);

      article = { ...article, ...this.surveyForm.value, tagIds };
      article.id = id;
      article.uid = user.uid;
      article.author = {};
      article.author.firstname = user.firstname;
      article.author.lastname = user.lastname;
      (article as any).createdAt = firebase.firestore.FieldValue.serverTimestamp();

      this.isEdit
        ? this.store.dispatch(SurveyActions.updateSurvey({ article }))
        : this.store.dispatch(SurveyActions.createSurvey({ article }));

    }
  }
}
