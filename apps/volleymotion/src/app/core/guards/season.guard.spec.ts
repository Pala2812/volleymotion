import { TestBed } from '@angular/core/testing';

import { SeasonGuard } from './season.guard';

describe('SeasonGuard', () => {
  let guard: SeasonGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SeasonGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
