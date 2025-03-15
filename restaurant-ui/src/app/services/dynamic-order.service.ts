import { Injectable } from '@angular/core';
import { ApplicationStateService } from './application-state.service';
import { OrderService } from './order.service';
import { WaiterOrderService } from './waiter-order.service';
import { Role } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class DynamicOrderService {

  constructor(
    private _applicationStateService: ApplicationStateService,
    private _orderService: OrderService,
    private _waiterOrderService: WaiterOrderService
  ) { }

  get orderService(): OrderService {
    return this._applicationStateService?.user?.role === Role.WAITER? this._waiterOrderService : this._orderService;
  }
}
