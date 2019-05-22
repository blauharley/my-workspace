import { TestBed } from '@angular/core/testing';

import { ToDoEffectService } from './to-do-effect.service';

describe('ToDoEffectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToDoEffectService = TestBed.get(ToDoEffectService);
    expect(service).toBeTruthy();
  });
});
