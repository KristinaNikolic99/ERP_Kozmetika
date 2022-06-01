import { TestBed } from '@angular/core/testing';

import { SlikaProdavniceService } from './slika-prodavnice.service';

describe('SlikaProdavniceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SlikaProdavniceService = TestBed.get(SlikaProdavniceService);
    expect(service).toBeTruthy();
  });
});
