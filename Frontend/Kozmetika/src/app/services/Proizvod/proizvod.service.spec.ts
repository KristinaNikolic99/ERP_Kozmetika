import { TestBed } from '@angular/core/testing';

import { ProizvodService } from './proizvod.service';

describe('ProizvodService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProizvodService = TestBed.get(ProizvodService);
    expect(service).toBeTruthy();
  });
});
