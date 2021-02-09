import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SeasonEffects } from './season.effects';

describe('SeasonEffects', () => {
  let actions$: Observable<any>;
  let effects: SeasonEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SeasonEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(SeasonEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
