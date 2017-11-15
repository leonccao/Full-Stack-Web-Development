import { TestBed, inject } from '@angular/core/testing';

import { LeaderService } from './leader.service';

describe('LeaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaderService]
    });
  });

  it('should ...', inject([LeaderService], (service: LeaderService) => {
    expect(service).toBeTruthy();
  }));
});
