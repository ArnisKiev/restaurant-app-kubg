import { Component, Input } from '@angular/core';
import { Dish } from 'src/app/interfaces/dish';
import { INonConfirmedDish } from 'src/app/screens/waiter/order-creating/order-confirm/order-confirm.component';
import { OrderService } from 'src/app/services/order.service';
import { WaiterOrderService } from 'src/app/services/waiter-order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {

  @Input() orderedDish:INonConfirmedDish;
  @Input() table: number;
  @Input() disabled: boolean;


  /**
   *
   */
  constructor(
    private waiterOrderService: WaiterOrderService
  ) {
  }

  onIncrease(count: number) {
    this.waiterOrderService.addNonConfirmedDishes(this.table, [this.orderedDish.dish]);
  }

  onDecrease(count: number) {
    this.waiterOrderService.deleteNonConfirmedDish(this.table, this.orderedDish.dish);
  }

  get sum() {
    return this.orderedDish.count * this.orderedDish.dish.price;
  }
 

}
