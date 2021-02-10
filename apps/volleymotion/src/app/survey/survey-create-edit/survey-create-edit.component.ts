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
import { QuillEditorComponent, QuillService } from 'ngx-quill';
import { Observable, Subject } from 'rxjs';
import { filter, take, takeUntil, withLatestFrom } from 'rxjs/operators';

import { Survey } from '../../core/models';
import { SurveyActions } from '../../core/store/actions';
import { loadSurveyById } from '../../core/store/actions/survey/survey.actions';
import { StoreState } from '../../core/store/reducers';
import { AuthSelectors, SurveySelectors } from '../../core/store/selectors';

@Component({
  selector: 'vm-survey-create-edit',
  templateUrl: './survey-create-edit.component.html',
  styleUrls: ['./survey-create-edit.component.scss'],
})
export class SurveyCreateEditComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('quill') quill: ElementRef<QuillEditorComponent>;
  survey$: Observable<Survey>;
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
  ) {}

  ngOnInit(): void {
    this.surveyForm = this.initSurveyForm();
    this.isCreatingSurvey$ = this.store.pipe(
      select(SurveySelectors.selectIsCreatingSurvey)
    );

    this.uid$ = this.store.pipe(select(AuthSelectors.selectUid));
    this.survey$ = this.store.pipe(select(SurveySelectors.selectSurvey));

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
          filter((survey) => !!survey),
          take(1)
        )
        .subscribe((survey) => {
          this.surveyForm = this.initSurveyForm(survey);
          (this?.quill as any)?.writeValue(survey?.description);
        });
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(SurveyActions.loadSurveyByIdSuccess({survey: undefined}));
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
      .subscribe(() => this.router.navigate(['umfragen']));
  }

  initSurveyForm(survey?: Survey): FormGroup {
    return new FormGroup({
      title: new FormControl(survey?.title || '', [Validators.required]),
      description: new FormControl(survey?.description || '', [
        Validators.required,
      ]),
    });
  }

  patchDescription(event: any) {
    this.surveyForm.controls.description.patchValue(event.html);
  }

  publish(form: FormGroup) {
    if (form.valid) {
      this.uid$
        .pipe(withLatestFrom(this.survey$), take(1))
        .subscribe((params) => {
          let survey = params[1] || ({} as Survey);
          survey = { ...survey, ...this.surveyForm.value };
          const id = params[1]?.id || this.fs.createId();
          survey.id = id;
          survey.uid = params[0];
          (survey as any).createdAt = firebase.firestore.FieldValue.serverTimestamp();

          this.isEdit
            ? this.store.dispatch(SurveyActions.updateSurvey({ survey }))
            : this.store.dispatch(SurveyActions.createSurvey({ survey }));
        });
    }
  }
}
