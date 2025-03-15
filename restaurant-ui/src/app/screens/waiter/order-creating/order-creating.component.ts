import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Dish, OrderedDish } from 'src/app/interfaces/dish';
import { Order } from 'src/app/interfaces/order';
import { DishService } from 'src/app/services/dish.service';
import { OrderService } from 'src/app/services/order.service';
import { getMapCountElementsFromArray } from 'src/app/utils/utils';
import { WaiterOrderService } from './../../../services/waiter-order.service';
import { BehaviorSubject, Observable, Subject, map, shareReplay, tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-order-creating',
  templateUrl: './order-creating.component.html',
  styleUrls: ['./order-creating.component.scss']
})
export class OrderCreatingComponent implements OnInit {

  table: number = 0;  
  order: Order;

  nonConfirmedOrderedDishes: Map<Dish, number> = new Map<Dish, number>();
  dishesInBill: Map<OrderedDish, number> = new Map<OrderedDish, number>();

  private _dishes$$: Subject<Dish[]> = new Subject<Dish[]>();
  dishes$: Observable<Dish[]> = this._dishes$$;


  private _order$$: BehaviorSubject<Order> = new BehaviorSubject<Order>(null);

  order$: Observable<Order> = this._order$$;

  dishesInBill$: Observable<Map<OrderedDish, number>> = this.order$.pipe(
    map(order => getMapCountElementsFromArray<OrderedDish>(order.dishes as OrderedDish[]))
  )
  


  constructor(
    private waiterOrderService: WaiterOrderService,
    private dishService: DishService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.table = data.table;
  }
  
  ngOnInit(): void {
    this.dishService.getAllDishes()
    .pipe(untilDestroyed(this))
    .subscribe(dishes => this._dishes$$.next(dishes));

    this.waiterOrderService.getOrderByTable(this.table)
    .pipe((tap(order => {
      if (order) {
        this._order$$.next(order);
      }
    })), 
    ).subscribe();
    

  }

  public onConfirmOrder() {
     this.waiterOrderService.getOrderByTable(this.table)
    .pipe((tap(order => {
      console.log(order)
      if (order) {
        this._order$$.next(order);
      }
    }))
    ).subscribe()
  }

}
