import { TestBed } from '@angular/core/testing';

import { UsersStorageService } from './users-storage.service';

describe('UserStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersStorageService = TestBed.get(UsersStorageService);
    expect(service).toBeTruthy();
  });
});
