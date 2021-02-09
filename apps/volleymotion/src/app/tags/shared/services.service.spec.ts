import { TestBed } from '@angular/core/testing';

import { TagProposalService } from './services.service';

describe('ServicesService', () => {
  let service: TagProposalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagProposalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
