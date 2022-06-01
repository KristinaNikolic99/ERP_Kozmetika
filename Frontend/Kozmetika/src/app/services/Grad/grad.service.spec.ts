import { TestBed } from '@angular/core/testing';

import { GradService } from './grad.service';

describe('GradService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GradService = TestBed.get(GradService);
    expect(service).toBeTruthy();
  });
});
