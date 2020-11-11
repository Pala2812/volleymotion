import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import firebase from 'firebase/app';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Survey } from '../../core/models';
import { SurveyActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import { SurveySelectors } from '../../core/store/selectors';

@Component({
  selector: 'vm-survey-create-edit',
  templateUrl: './survey-create-edit.component.html',
  styleUrls: ['./survey-create-edit.component.scss'],
})
export class SurveyCreateEditComponent implements OnInit, OnDestroy {
  isCreatingSurvey$: Observable<boolean>;
  surveyForm: FormGroup;

  private unsubscribe$ = new Subject();

  constructor(
    private store: Store<StoreState>,
    private actions: Actions,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.surveyForm = this.initSurveyForm();
    this.isCreatingSurvey$ = this.store.pipe(
      select(SurveySelectors.selectIsCreatingSurvey)
    );

    this.actions
      .pipe(
        ofType(SurveyActions.createSurveySuccess),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => this.router.navigate(['umfragen']));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initSurveyForm(): FormGroup {
    return new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
      description: new FormControl('', [Validators.required]),
    });
  }

  patchDescription(event: any) {
    this.surveyForm.controls.description.patchValue(event.html);
  }

  publish(form: FormGroup) {
    if (form.valid) {
      const survey: Survey = this.surveyForm.value;
      survey.createdAt = firebase.firestore.FieldValue.serverTimestamp();
      this.store.dispatch(SurveyActions.createSurvey({ survey }));
    }
  }
}
