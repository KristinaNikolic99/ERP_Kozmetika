import { TestBed } from '@angular/core/testing';

import { SlikeBrendaService } from './slike-brenda.service';

describe('SlikeBrendaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SlikeBrendaService = TestBed.get(SlikeBrendaService);
    expect(service).toBeTruthy();
  });
});
