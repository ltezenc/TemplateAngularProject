import { TestBed } from '@angular/core/testing';

import { ListarFacturaService } from './listar-factura.service';

describe('ListarFacturaService', () => {
  let service: ListarFacturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListarFacturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
