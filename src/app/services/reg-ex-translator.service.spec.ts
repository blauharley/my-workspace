import { TestBed } from '@angular/core/testing';

import { RegExTranslatorService } from './reg-ex-translator.service';

describe('RegExTranslatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegExTranslatorService = TestBed.get(RegExTranslatorService);
    expect(service).toBeTruthy();
  });
});
