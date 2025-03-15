import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, count, map, shareReplay, switchMap } from 'rxjs';
import { Dish } from 'src/app/interfaces/dish';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';
import { WaiterOrderService } from 'src/app/services/waiter-order.service';
import { getMapCountElementsFromArray } from 'src/app/utils/utils';

export interface INonConfirmedDish {
  count: number;
  dish: Dish;
}

@UntilDestroy()
@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderConfirmComponent implements OnInit {


  @Input() table: number = 0;

  //nonConfirmedDishesMap: Map<Dish, number> = new Map<Dish, number>();

  @Input()
  order: Order = null;

  @Output()
  confirmDishes: EventEmitter<void> = new EventEmitter<void>();

  nonConfirmedDishesMap$: Observable<Map<Dish, number>>;
  nonConfirmedDishesLength$: Observable<number>;
  nonConfirmedDishes$: Observable<{dish: Dish, count: number}[]>;


  constructor(
    public waiterOrderService: WaiterOrderService
  ) {}

 

  ngOnInit(): void {

    this.nonConfirmedDishesMap$ = this.waiterOrderService.nonConfirmedOrders$.pipe(
      map(nonConfirmedOrders => {
        const nonConfirmedDishes = nonConfirmedOrders.get(this.table) ?? [];

        return getMapCountElementsFromArray(nonConfirmedDishes);
      }),
      shareReplay(1)
    );

    this.nonConfirmedDishesLength$ = this.nonConfirmedDishesMap$.pipe(map(val => val.size));

    this.nonConfirmedDishes$ = this.waiterOrderService.nonConfirmedOrders$.pipe(
      map(nonConfirmedOrders => {
        const nonConfirmedDishes: Dish[] = nonConfirmedOrders.get(this.table) ?? [];
        const mapDishCount = getMapCountElementsFromArray<Dish>(nonConfirmedDishes);

        return Array.from(mapDishCount).map(([dish, count]) =>  {
  
          return {
            dish,
            count
          }
        }); 

    }));
  }

  get sumOfPrices() {
    return this.waiterOrderService.getNonConfirmedDishesForTable(this.table).reduce((previous, current) => previous + current.price , 0);
  }

  onConfirmClick() {
    if (!this.order) {
      this.waiterOrderService.createOrderForTable(this.table);
    } else {
      this.waiterOrderService.addNonConfirmedDishesToOrder(this.table);
    }

      this.confirmDishes.emit();
  
   
  }
}
