import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Order } from '../interfaces/order';
import { serverEndPoint } from '../constants/urls';
import { ApplicationStateService } from './application-state.service';
import { Dish, IChangedOrderedDishState, OrderedDish } from '../interfaces/dish';
import { IWebsocketMessage } from '../interfaces/web-socket';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { OrderDishState } from '../enums/order-dish-state';
import { isNil } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  protected _preparingDishes$: BehaviorSubject<OrderedDish[]> = new BehaviorSubject<OrderedDish[]>([]);
  preparingDishes$: Observable<OrderedDish[]> = this._preparingDishes$;

  get  preparingDishes() {
    return this._preparingDishes$.value;
  }

  onAddDishInBill$$: Subject<void> = new Subject<void>();
  onCloseTable$$: Subject<number> = new Subject<number>();

  onChangeNonConfirmedOrder$$: Subject<void> = new Subject<void>();

  protected apiService: ApiService = inject(ApiService);
  protected applicarionStateService: ApplicationStateService = inject(ApplicationStateService);

 
  initPreparingDishes() {
    this.getAllPreparingDishes().subscribe(dishes => {
       this._preparingDishes$.next(dishes) 
      
       console.log(dishes)
      });
  }

  create(order: Order, callBack?: () => void) {
    return this.apiService.post<Order>(serverEndPoint.order.standartRequest, order)
    .pipe(tap(()=> callBack?.())).subscribe();
  }

  public getAllPreparingDishes(): Observable<OrderedDish[]> {
    return this.apiService.get<OrderedDish[]>(serverEndPoint.order.preparingOrders)
  }


  public updateOrderedDish(data: IChangedOrderedDishState) {
    return this.apiService.post<any>(serverEndPoint.order.changeOrderedDishState, data);
  }


  public updateOrder(order: Order, callback?: () => void) {
    return this.apiService.put(serverEndPoint.order.standartRequest, order)
    .pipe(tap(() => callback?.()));
  }

  public getOrderByTable(table: number) {
    return this.apiService.get<Order>(serverEndPoint.order.getOrderByTable, [{
      propertyName: 'table',
      propertyValue: table
    }])
  }

  processOnOrderCreating(message: IWebsocketMessage) {
    const preparingDishes = this.preparingDishes.concat(message.payload);
    debugger
    this._preparingDishes$.next(preparingDishes);
  }

  processOnUpdatingOrederedDishState(message: IWebsocketMessage) {

    debugger

    let preparingDishes = this.preparingDishes;

    const orderedDish: OrderedDish = message.payload;

    const indexOfpreviusState = preparingDishes.filter(x => !isNil(x.orderDishState))
    .findIndex(x => x?._id === orderedDish?._id && x.orderDishState !== orderedDish?.orderDishState);

    if (indexOfpreviusState !== -1) {
    
    if (orderedDish.orderDishState === OrderDishState.WaitingWaiter) {
      preparingDishes[indexOfpreviusState] = orderedDish;
      this._preparingDishes$.next(preparingDishes);
      return;
    }

    preparingDishes.splice(indexOfpreviusState, 1);
    this._preparingDishes$.next(preparingDishes);
  }
 
 }

}
