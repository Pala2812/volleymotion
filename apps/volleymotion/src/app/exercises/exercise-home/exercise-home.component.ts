import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Exercise } from '@volleymotion/models';
import { Observable } from 'rxjs';
import { ExerciseActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import { ExerciseSelectors } from '../../core/store/selectors';

@Component({
  selector: 'vm-exercise-home',
  templateUrl: './exercise-home.component.html',
  styleUrls: ['./exercise-home.component.scss']
})
export class ExerciseHomeComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoadingExercises$: Observable<boolean>;

  constructor(private store: Store<StoreState>) { }

  ngOnInit(): void {
    this.exercises$ = this.store.pipe(select(ExerciseSelectors.selectExercises));
    this.isLoadingExercises$ = this.store.pipe(select(ExerciseSelectors.selectIsLoadingExercises));
    this.store.dispatch(ExerciseActions.loadExercises());
  }

}
