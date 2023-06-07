import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Images } from 'src/app/constants/images';
import { Dish } from 'src/app/interfaces/dish';

@Component({
  selector: 'app-dish-info',
  templateUrl: './dish-info.component.html',
  styleUrls: ['./dish-info.component.scss']
})
export class DishInfoComponent {

  dish: Dish = null; 

  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dish = data.dish;
  }


  get image() {
    return Images[this.dish.cookingPlace]
  }

  

}
