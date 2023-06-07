import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { count, switchMap } from 'rxjs';
import { Dish } from 'src/app/interfaces/dish';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';
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

  nonConfirmedDishesMap: Map<Dish, number> = new Map<Dish, number>();

  order: Order = null;



  constructor(public orderService: OrderService,
    private cdr: ChangeDetectorRef) {
  }

 

  ngOnInit(): void {
     const nonConfirmedDishes = this.orderService.getNonConfirmedDishesForTable(this.table);
     if (nonConfirmedDishes.length) {
      this.nonConfirmedDishesMap = getMapCountElementsFromArray(nonConfirmedDishes);
     }

     this.orderService.onChangeNonConfirmedOrder$$.subscribe(() => {
       this.cdr.detectChanges() 
     })

     this.orderService.getOrderByTable(this.table).subscribe(order => this.order = order);

     this.orderService.onAddDishInBill$$.pipe(untilDestroyed(this), switchMap(() =>this.orderService.getOrderByTable(this.table))).subscribe(order => this.order = order);

  }


  get nonConfirmedDishesLength() {
    return this.nonConfirmedDishesMap.size;
  }


  get nonConfirmedDishes() {
    const nonc = getMapCountElementsFromArray<Dish>( this.orderService.getNonConfirmedDishesForTable(this.table))
    return Array.from(nonc).map(([dish, count]) =>  {
  
      return {
        dish,
        count
      }
    })
  }

  get sumOfPrices() {
    return this.orderService.getNonConfirmedDishesForTable(this.table).reduce((previous, current) => previous + current.price , 0);
  }


  onConfirmClick() {
    
      this.orderService.createOrderForTable(this.table).subscribe();
  

  }


}
