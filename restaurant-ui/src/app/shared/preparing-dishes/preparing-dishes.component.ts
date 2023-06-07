import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderedDish } from 'src/app/interfaces/dish';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-preparing-dishes',
  templateUrl: './preparing-dishes.component.html',
  styleUrls: ['./preparing-dishes.component.scss']
})
export class PreparingDishesComponent {

  @Input() orderedDishes: OrderedDish[] = []; 
  @Input() hasOnCardClickAction: boolean = false;

  @Output() onCardClick: EventEmitter<OrderedDish> = new EventEmitter<OrderedDish>();

  /**
   *
   */
  constructor(private modalService: ModalService) {

  }

  onClick(orderedDish: OrderedDish) {
    return () => { 
      this.onCardClick.next(orderedDish) };
  } 

}
