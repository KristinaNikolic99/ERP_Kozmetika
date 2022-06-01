import { TestBed } from '@angular/core/testing';

import { KorisnikService } from './korisnik.service';

describe('KorisnikService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KorisnikService = TestBed.get(KorisnikService);
    expect(service).toBeTruthy();
  });
});
