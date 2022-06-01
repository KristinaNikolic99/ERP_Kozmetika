import { TestBed } from '@angular/core/testing';

import { SlikaProizvodaService } from './slika-proizvoda.service';

describe('SlikaProizvodaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SlikaProizvodaService = TestBed.get(SlikaProizvodaService);
    expect(service).toBeTruthy();
  });
});
