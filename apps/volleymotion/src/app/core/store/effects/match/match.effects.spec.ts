import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MatchEffects } from './match.effects';

describe('MatchEffects', () => {
  let actions$: Observable<any>;
  let effects: MatchEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MatchEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(MatchEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
