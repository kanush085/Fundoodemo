import { TestBed, inject } from '@angular/core/testing';

import { UserservicesService } from './userservices.service';

describe('UserservicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserservicesService]
    });
  });

  it('should be created', inject([UserservicesService], (service: UserservicesService) => {
    expect(service).toBeTruthy();
  }));
});
