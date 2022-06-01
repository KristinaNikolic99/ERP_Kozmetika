import { TestBed } from '@angular/core/testing';

import { VrstaProizvodaService } from './vrsta-proizvoda.service';

describe('VrstaProizvodaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VrstaProizvodaService = TestBed.get(VrstaProizvodaService);
    expect(service).toBeTruthy();
  });
});
