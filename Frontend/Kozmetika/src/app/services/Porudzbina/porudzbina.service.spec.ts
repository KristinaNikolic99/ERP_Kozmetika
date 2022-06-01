import { TestBed } from '@angular/core/testing';

import { PorudzbinaService } from './porudzbina.service';

describe('PorudzbinaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PorudzbinaService = TestBed.get(PorudzbinaService);
    expect(service).toBeTruthy();
  });
});
