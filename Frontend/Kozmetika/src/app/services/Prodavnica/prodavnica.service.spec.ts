import { TestBed } from '@angular/core/testing';

import { ProdavnicaService } from './prodavnica.service';

describe('ProdavnicaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdavnicaService = TestBed.get(ProdavnicaService);
    expect(service).toBeTruthy();
  });
});
