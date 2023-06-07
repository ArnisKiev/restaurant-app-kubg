import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { switchMap } from 'rxjs';
import { Dish, OrderedDish } from 'src/app/interfaces/dish';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';
import { getMapCountElementsFromArray } from 'src/app/utils/utils';


@UntilDestroy()
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent {

  @Input() table: number = 0;

  nonConfirmedDishesMap: Map<OrderedDish, number> = new Map<OrderedDish, number>();

  order: Order = null;




  constructor(public orderService: OrderService,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
     const nonConfirmedDishes = this.orderService.getNonConfirmedDishesForTable(this.table);
     console.log(nonConfirmedDishes)

     this.orderService.getOrderByTable(this.table).subscribe(order => {
      this.order = order;
      this.cdr.detectChanges();
     })

     this.orderService.onAddDishInBill$$
     .pipe(untilDestroyed(this),
     switchMap(()=>this.orderService.getOrderByTable(this.table)))
     .subscribe(order => {
      this.order = order;
      this.cdr.detectChanges();
     })


     this.orderService.onChangeNonConfirmedOrder$$.subscribe(() => {
       this.cdr.detectChanges() 
     })

  }


  get nonConfirmedDishesLength() {
    return this.nonConfirmedDishesMap.size;
  }


  get dishesBill() {

    if(!this.order?.dishes) {
      return [];
    }

   const dishes: any[] = this.order?.dishes.map(x => {
    return {
      title: x.title,
      price: x.price
    }
   })

  

   const dish2 = dishes.reduce((prev: any[], curr) => {

    const contElement = prev?.find( x => x.dish.title === curr.title && x.dish.price === curr.price);

    if (contElement) {
      contElement.count = contElement.count + 1;
    } else {

      if (!prev) {
        prev = [];
      }

      prev.push({
        dish: curr,
        count: 1
      })
    }

    return prev

   }, []);

   return dish2;


  }

  get sumOfPrices() {
    return this.dishesBill.reduce((prev, curr) => prev + curr.count * curr.dish.price , 0)
  }


  onCloseOrder() {
   this.order.isActive = false;
   this.orderService.updateOrder(this.order).subscribe(res => this.order = null);
  }

}
