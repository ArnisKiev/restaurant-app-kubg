import { TestBed } from '@angular/core/testing';

import { WaiterOrderService } from './waiter-order.service';

describe('WaiterOrderService', () => {
  let service: WaiterOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaiterOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
