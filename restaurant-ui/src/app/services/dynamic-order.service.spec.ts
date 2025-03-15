import { TestBed } from '@angular/core/testing';

import { DynamicOrderService } from './dynamic-order.service';

describe('DynamicOrderService', () => {
  let service: DynamicOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
