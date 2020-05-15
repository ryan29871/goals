import { TestBed } from '@angular/core/testing';

import { IsAuthenticated.Guard.TsGuard } from './is-authenticated.guard.ts.guard';

describe('IsAuthenticated.Guard.TsGuard', () => {
  let guard: IsAuthenticated.Guard.TsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsAuthenticated.Guard.TsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
