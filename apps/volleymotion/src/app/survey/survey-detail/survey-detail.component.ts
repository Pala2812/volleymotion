import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, withLatestFrom } from 'rxjs/operators';
import firebase from 'firebase/app';

import { Article, SurveyComment } from '../../core/models';
import { SurveyActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import { AuthSelectors, SurveySelectors } from '../../core/store/selectors';
import { AuthDialogComponent } from '../../shared/components/auth-dialog/auth-dialog.component';

@Component({
  selector: 'vm-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.scss'],
})
export class SurveyDetailComponent implements OnInit {
  isLoadingSurvey$: Observable<boolean>;
  isLoadingSurveyComments$: Observable<boolean>;
  surveyComments$: Observable<SurveyComment[]>;
  survey$: Observable<Article>;
  messageForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private store: Store<StoreState>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.messageForm = this.initMessageForm();
    this.route.params.subscribe((params) => {
      const id = params.id;
      this.store.dispatch(SurveyActions.loadSurveyById({ id }));
      this.store.dispatch(SurveyActions.loadCommentsOfSurvey({ id }));
    });

    this.isLoadingSurvey$ = this.store.pipe(
      select(SurveySelectors.selectIsLoadingSurvey)
    );

    this.surveyComments$ = this.store.pipe(
      select(SurveySelectors.selectSurveyComments)
    );

    this.survey$ = this.store.pipe(select(SurveySelectors.selectSurvey));
  }

  initMessageForm(): FormGroup {
    return new FormGroup({
      message: new FormControl('', [Validators.required]),
    });
  }

  likeSurvey(survey: Article, event: Event) {
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

  reportSurvey(survey: Article, event: Event) {
    this.store
      .pipe(select(AuthSelectors.selectUid))
      .pipe(take(1))
      .subscribe((uid) => {
        if (!uid) {
          return this.dialog.open(AuthDialogComponent);
        }
        this.store.dispatch(SurveyActions.reportSurvey({ id: survey.id }));
        event.stopImmediatePropagation();
      });
  }

  sendMessage(form: FormGroup) {
    if (form.valid) {
      this.survey$
        .pipe(
          withLatestFrom(this.store.pipe(select(AuthSelectors.selectUid))),
          take(1)
        )
        .subscribe((params) => {
          const survey = params[0];
          const uid = params[1];

          if (!uid) {
            return this.dialog.open(AuthDialogComponent);
          }
          
          const comment = form.controls.message.value;
          const message: SurveyComment = {
            uid,
            message: comment,
            surveyId: survey.id,
          };
          (message as any).createdAt = firebase.firestore.FieldValue.serverTimestamp();

          this.store.dispatch(SurveyActions.addCommentToSurvey({ message }));
          form.reset();
          Object.keys(form.controls).forEach((key) => {
            form.get(key).setErrors(null);
          });
        });
    }
  }
}
