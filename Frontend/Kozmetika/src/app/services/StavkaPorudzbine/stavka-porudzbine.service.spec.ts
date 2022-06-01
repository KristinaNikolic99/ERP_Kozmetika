import { TestBed } from '@angular/core/testing';

import { StavkaPorudzbineService } from './stavka-porudzbine.service';

describe('StavkaPorudzbineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StavkaPorudzbineService = TestBed.get(StavkaPorudzbineService);
    expect(service).toBeTruthy();
  });
});
