import { TestBed } from '@angular/core/testing';

import { IsNotAuthenticated.GuardGuard } from './is-not-authenticated.guard.guard';

describe('IsNotAuthenticated.GuardGuard', () => {
  let guard: IsNotAuthenticated.GuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsNotAuthenticated.GuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
