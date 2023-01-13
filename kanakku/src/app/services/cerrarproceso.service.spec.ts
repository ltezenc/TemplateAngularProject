import { TestBed } from '@angular/core/testing';

import { CerrarprocesoService } from './cerrarproceso.service';

describe('CerrarprocesoService', () => {
  let service: CerrarprocesoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CerrarprocesoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
