import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { AnimationStep, Tag } from '@volleymotion/models';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ExerciseActions } from '../../../core/store/actions';
import { StoreState } from '../../../core/store/reducers';
import { ExerciseSelectors } from '../../../core/store/selectors';

@Component({
  selector: 'vm-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss']
})
export class ExerciseFormComponent implements OnInit {
  @Input() positions: any;
  @Input() tools: any;
  @Input() tags$: Observable<Tag[]> | undefined;
  @Input() animationSteps: AnimationStep[] = [];
  isCreatingExercise$: Observable<boolean> | undefined;
  filteredTags$: Observable<Tag[]> | undefined;
  form = this.initForm();
  sportTypes = ['Hallenvolleyball', 'Beachvolleyball', 'Snowvolleyball'];

  constructor(private store: Store<StoreState>, private router: Router, private actions$: Actions) { }

  ngOnInit(): void {
    this.filteredTags$ = this.tags$;
    this.isCreatingExercise$ = this.store.pipe(select(ExerciseSelectors.selectIsCreatingExercise));

    this.actions$.pipe(ofType(ExerciseActions.createExerciseSuccess), take(1))
      .subscribe(() => this.router.navigate(['/übungen']));
  }

  initForm(): FormGroup {
    return new FormGroup({
      title: new FormControl('', [Validators.required]),
      sportType: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      objective: new FormControl('', [Validators.required]),
      tags: new FormArray([], [Validators.required]),
    });
  }

  get tags() {
    return this.form?.get('tags') as FormArray;
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

    this.filteredTags$ = this.filteredTags$?.pipe(
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

  submit(form: FormGroup, animationSteps: AnimationStep[], positions: any, tools: any) {
    form.markAllAsTouched();
    if (!animationSteps?.length) {
      alert('Bitte füge eine Animation hinzu');
      return;
    }

    if (form.valid) {
      let exercise = form.value;
      exercise = { ...exercise, animationSteps, positions, tools, };
      console.log(exercise);
      this.store.dispatch(ExerciseActions.createExercise({ exercise }));
    }
  }

}
