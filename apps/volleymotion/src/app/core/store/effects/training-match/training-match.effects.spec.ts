import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TrainingMatchEffects } from './training-match.effects';

describe('TrainingMatchEffects', () => {
  let actions$: Observable<any>;
  let effects: TrainingMatchEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TrainingMatchEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(TrainingMatchEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
