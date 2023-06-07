import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Order } from '../interfaces/order';
import { serverEndPoint } from '../constants/urls';
import { ApplicationStateService } from './application-state.service';
import { Dish, IChangedOrderedDishState, OrderedDish } from '../interfaces/dish';
import { IWebsocketMessage } from '../interfaces/web-socket';
import { Observable, Subject, tap } from 'rxjs';
import { OrderDishState } from '../enums/order-dish-state';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public _nonConfirmOrders: Map<number, Dish[]> = new Map<number, Dish[]>();
  preparingDishes: OrderedDish[] = [];

  onAddDishInBill$$: Subject<void> = new Subject<void>();
  onCloseTable$$: Subject<number> = new Subject<number>();

  onChangeNonConfirmedOrder$$: Subject<void> = new Subject<void>();

  constructor(
    private apiService: ApiService,
    private applicarionStateService: ApplicationStateService
  ) { }


  getNonConfirmedDishesForTable(table: number) {
    return this._nonConfirmOrders.get(table) || [];
  }

  addToNonConfirmedDishes(table: number, addedDishes: Dish[]) {
    if (!this._nonConfirmOrders.has(table)) {
      this._nonConfirmOrders.set(table, addedDishes);
    } else {
      const dishes = this._nonConfirmOrders.get(table);
      this._nonConfirmOrders.set(table, dishes.concat(addedDishes));
    }

    this.onChangeNonConfirmedOrder$$.next();
  }


  deleteNonConfirmedDish(table: number, dish: Dish) {
    if (this._nonConfirmOrders.has(table)) {
     const tableDishes = this._nonConfirmOrders.get(table);
     const deletedDishIndex = tableDishes.indexOf(dish);
     tableDishes.splice(deletedDishIndex, 1);
     this._nonConfirmOrders.set(table, tableDishes);
    }
  }

  updateNonConfirmedDishes(table: number, addedDishes: Dish[]) {
    
    if (!addedDishes.length) {
      this._nonConfirmOrders.delete(table);
      return;
    }

    this._nonConfirmOrders.set(table, addedDishes);
    this.onChangeNonConfirmedOrder$$.next();
  }

  public createOrderForTable(table: number) {

    const order: Order = {
      waiter: this.applicarionStateService.user,
      dishes: this._nonConfirmOrders.get(table),
      table: table,
    };

    this._nonConfirmOrders.delete(table);
    return this.apiService.post<Order>(serverEndPoint.order.standartRequest, order)
    .pipe(tap(()=> this.onAddDishInBill$$.next()));
  }

  public getAllPreparingDishes() {
    return this.apiService.get<OrderedDish[]>(serverEndPoint.order.preparingOrders)
  }

  public initPreparingDishes() {
    this.apiService.get<OrderedDish[]>(serverEndPoint.order.preparingOrders)
    .subscribe((preparingDishes: OrderedDish[]) => {
       this.preparingDishes = preparingDishes;
    })
  }


  public updateOrderedDishState(data: IChangedOrderedDishState) {
    return this.apiService.post<any>(serverEndPoint.order.changeOrderedDishState, data);
  }


   public updateOrder(order: Order) {
    return this.apiService.put(serverEndPoint.order.standartRequest, order)
    .pipe(tap(()=> this.onAddDishInBill$$.next()));
  }


  public getOrderByTable(table: number) {
    return this.apiService.get<Order>(serverEndPoint.order.getOrderByTable, [{
      propertyName: 'table',
      propertyValue: table
    }])
  }

  processOnOrderCreating(message: IWebsocketMessage) {
    this.preparingDishes = this.preparingDishes.concat(message.payload);
  }

  processOnUpdatingOrederedDishState(message: IWebsocketMessage) {


    const orderedDish: OrderedDish = message.payload;

    const indexOfpreviusState = this.preparingDishes.findIndex(x => x?._id === orderedDish?._id && x.orderDishState !== orderedDish?.orderDishState);

    if (indexOfpreviusState !== -1) {
    
    if (orderedDish.orderDishState === OrderDishState.WaitingWaiter) {
      this.preparingDishes[indexOfpreviusState] = orderedDish;
      return;
    }

    this.preparingDishes.splice(indexOfpreviusState, 1);
  }
 
 }

 addNonConfirmedDishesToOrder(order: Order, table: number) {
  
  const nonConfirmedDishes = this._nonConfirmOrders.get(table);
  this._nonConfirmOrders.delete(table);

  order.dishes = order.dishes.concat(nonConfirmedDishes);

  
 }

}
