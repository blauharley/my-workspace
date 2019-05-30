import { TestBed } from '@angular/core/testing';

import { AlertMockServiceService } from './alert-mock-service.service';

describe('AlertMockServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlertMockServiceService = TestBed.get(AlertMockServiceService);
    expect(service).toBeTruthy();
  });
});
