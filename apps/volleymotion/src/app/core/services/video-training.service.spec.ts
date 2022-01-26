import { TestBed } from '@angular/core/testing';

import { VideoTrainingService } from './video-training.service';

describe('VideoTrainingService', () => {
  let service: VideoTrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoTrainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
