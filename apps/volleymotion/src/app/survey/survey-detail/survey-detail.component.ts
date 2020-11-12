import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, withLatestFrom } from 'rxjs/operators';

import { Survey, SurveyComment } from '../../core/models';
import { SurveyActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import { AuthSelectors, SurveySelectors } from '../../core/store/selectors';
import { SurveyCreateEditComponent } from '../survey-create-edit/survey-create-edit.component';

@Component({
  selector: 'vm-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.scss'],
})
export class SurveyDetailComponent implements OnInit {
  isLoadingSurvey$: Observable<boolean>;
  isLoadingSurveyComments$: Observable<boolean>;
  surveyComments$: Observable<SurveyComment[]>;
  survey$: Observable<Survey>;
  messageForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private store: Store<StoreState>
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
  likeSurvey() {
    this.survey$
      .pipe(
        withLatestFrom(this.store.pipe(select(AuthSelectors.selectUid))),
        take(1)
      )
      .subscribe((params) => {
        if (!params[1]) {
          return alert('Bitte registrieren Sie sich');
        }
        this.store.dispatch(SurveyActions.likeSurvey({ id: params[0].id }));
      });
  }

  sendMessage(form: FormGroup) {
    if (form.valid) {
      this.survey$.pipe(take(1)).subscribe((survey) => {
        const comment = form.controls.message.value;
        const message: SurveyComment = {
          message: comment,
          surveyId: survey.id,
        };
        this.store.dispatch(SurveyActions.addCommentToSurvey({ message }));
        form.reset();
        Object.keys(form.controls).forEach((key) => {
          form.get(key).setErrors(null);
        });
      });
    }
  }
}