import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddingDish } from 'src/app/interfaces/adding-dish';
import { Dish } from 'src/app/interfaces/dish';
import { DishService } from 'src/app/services/dish.service';
import { range  } from 'lodash';
import { OrderService } from 'src/app/services/order.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CookingPlaceOptions } from 'src/app/interfaces/user';
import { WaiterOrderService } from './../../../../services/waiter-order.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {


  filterForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    cookingPlace: new FormControl(null)
  })

  cookingPlaceOptions = CookingPlaceOptions;
 
  @Input() table: number = 0;
  @Input() dishes: Dish[] = [];
  displayedDishes: Dish[] = [];

 

  constructor(
    public dishService: DishService,
    private waiterOrderService: WaiterOrderService
  ) {
  }

  ngOnInit(): void {
    this.dishService.getAllDishes()
    .subscribe((dishes: Dish[]) => this.dishes = dishes);

    if (!this.cookingPlaceOptions.some(x => x.displayValue === 'Всі')) {
      this.cookingPlaceOptions.push({
        displayValue: 'Всі',
        value: null
      })
    }

   
  }

  get filteredDishes(): Dish[] {
    return this.dishes.filter(dish => {
      const filteredCookingPlace = this.filterForm.controls['cookingPlace'].value;
      const filtededCookingPlaceResult = !filteredCookingPlace? true : filteredCookingPlace === dish.cookingPlace;
      const titleFiltered = this.filterForm.controls['title'].value;
      return filtededCookingPlaceResult && dish.title.toLowerCase().includes(titleFiltered.toLowerCase())
    })
  }

  onAddDish(addingDish: AddingDish) {
    const clonedDishes = range(addingDish.count).map(x => addingDish.dish)
    this.waiterOrderService.addNonConfirmedDishes(this.table, clonedDishes);
  }

}
