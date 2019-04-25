import { TestBed } from '@angular/core/testing';

import { UseYourOwnRegExService } from './use-your-own-reg-ex.service';

describe('UseYourOwnRegExService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UseYourOwnRegExService = TestBed.get(UseYourOwnRegExService);
    expect(service).toBeTruthy();
  });
});
