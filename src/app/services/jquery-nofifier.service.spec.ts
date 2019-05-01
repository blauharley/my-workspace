import { TestBed } from '@angular/core/testing';

import { JqueryNofifierService } from './jquery-nofifier.service';

describe('JqueryNofifierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JqueryNofifierService = TestBed.get(JqueryNofifierService);
    expect(service).toBeTruthy();
  });
});
