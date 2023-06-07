import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Images } from 'src/app/constants/images';
import { AddingDish } from 'src/app/interfaces/adding-dish';
import { Dish } from 'src/app/interfaces/dish';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.scss']
})
export class DishCardComponent {

  @Input() dish: Dish;
  
  @Output() onAddEmit: EventEmitter<AddingDish> = new EventEmitter<AddingDish>();
  public count: number = 0;



  public decreaseCount(event: number) {
  }
  

  get description() {
    return this.dish.components.map(x => x.name).join(', ')
  }

  get image() {
    return Images[this.dish.cookingPlace]
  }

  public onAddClick() {
    this.onAddEmit.next({
      count: this.count,
      dish: this.dish
    });

    this.count = 0;
  }
}
