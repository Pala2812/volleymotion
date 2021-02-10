import { TestBed } from '@angular/core/testing';

import { TrainingMatchService } from './training-match.service';

describe('TrainingMatchService', () => {
  let service: TrainingMatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingMatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
