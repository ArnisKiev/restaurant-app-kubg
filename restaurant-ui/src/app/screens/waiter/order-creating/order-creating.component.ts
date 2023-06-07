import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Dish, OrderedDish } from 'src/app/interfaces/dish';
import { Order } from 'src/app/interfaces/order';
import { DishService } from 'src/app/services/dish.service';
import { OrderService } from 'src/app/services/order.service';
import { getMapCountElementsFromArray } from 'src/app/utils/utils';

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

  dishes: Dish[] = [];


  constructor(
    private orderService: OrderService,
    private dishService: DishService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.table = data.table;
  }
  ngOnInit(): void {
    this.dishService.getAllDishes()
    .pipe(untilDestroyed(this))
    .subscribe(dishes => this.dishes = dishes);

    this.orderService.getOrderByTable(this.table)
    .subscribe(order => {
      if (order) {
      this.order = order;
      this.dishesInBill = getMapCountElementsFromArray<OrderedDish>(order.dishes as OrderedDish[]);
      }
    })


  }


  public onConfirmOrder() {
    this.orderService.createOrderForTable(this.table)
    .pipe(untilDestroyed(this))
    .subscribe();
  }

}
