import { TestBed } from '@angular/core/testing';

import { RecenzijaProizvodaService } from './recenzija-proizvoda.service';

describe('RecenzijaProizvodaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecenzijaProizvodaService = TestBed.get(RecenzijaProizvodaService);
    expect(service).toBeTruthy();
  });
});
