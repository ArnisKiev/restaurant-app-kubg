import { Injectable } from '@angular/core';
import { OrderService } from './order.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dish } from '../interfaces/dish';
import { Order } from '../interfaces/order';
import { serverEndPoint } from '../constants/urls';

@Injectable({
  providedIn: 'root'
})
export class WaiterOrderService extends OrderService {
  private _nonConfirmedOrders$$: BehaviorSubject<Map<number, Dish[]>> = new BehaviorSubject<Map<number, Dish[]>>(new Map<number, Dish[]>());

  public nonConfirmedOrders$: Observable<Map<number, Dish[]>> = this._nonConfirmedOrders$$;

  constructor() {
    super();
  }

  private get nonConfirmedOrders(): Map<number, Dish[]> {
    return this._nonConfirmedOrders$$.value;
  }

  getNonConfirmedDishesForTable(table: number) {
    return this.nonConfirmedOrders.get(table) ?? [];
  }

  deleteNonConfirmedOrder(table: number) {
    const nonConfirmedOrders = this.nonConfirmedOrders;
    nonConfirmedOrders.delete(table);
    this._nonConfirmedOrders$$.next(nonConfirmedOrders);
  }

  addNonConfirmedDishes(table: number, addedDishes: Dish[]) {
    const nonConfirmedOrders = this.nonConfirmedOrders;

    if (!this.nonConfirmedOrders.has(table)) {
      nonConfirmedOrders.set(table, addedDishes);
    } else {
      const dishes = nonConfirmedOrders.get(table);
      const updatedDishes = dishes.concat(addedDishes);
      nonConfirmedOrders.set(table, updatedDishes);
    }

    this._nonConfirmedOrders$$.next(nonConfirmedOrders);
  }

  deleteNonConfirmedDish(table: number, dish: Dish) {
    const nonConfirmedOrders = this.nonConfirmedOrders;

    if (nonConfirmedOrders.has(table)) {
     const tableDishes = this.nonConfirmedOrders.get(table);
     const deletedDishIndex = tableDishes.indexOf(dish);
     tableDishes.splice(deletedDishIndex, 1);
     nonConfirmedOrders.set(table, tableDishes);

     this._nonConfirmedOrders$$.next(nonConfirmedOrders);
    }
  }

  updateNonConfirmedDishes(table: number, addedDishes: Dish[]) {
    
    const nonConfirmedOrders = this.nonConfirmedOrders;

    if (!addedDishes.length) {
      this.nonConfirmedOrders.delete(table);
    } else {
      nonConfirmedOrders.set(table, addedDishes);
    }

    this._nonConfirmedOrders$$.next(nonConfirmedOrders);
  }

  public createOrderForTable(table: number) {
    const order: Order = {
      waiter: this.applicarionStateService.user,
      dishes: this.nonConfirmedOrders.get(table),
      table: table,
    };

    this.create(order);

    this.deleteNonConfirmedOrder(table);
  }

  addNonConfirmedDishesToOrder(table: number) {
    const dishes = this.getNonConfirmedDishesForTable(table);

    const updated = {
      dishes,
      table
    }

    this.deleteNonConfirmedOrder(table);

    this.apiService.put(serverEndPoint.order.addDishesToOrder, updated).subscribe();

   }
}
