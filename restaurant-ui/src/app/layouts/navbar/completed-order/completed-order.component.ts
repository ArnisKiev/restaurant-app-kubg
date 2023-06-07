import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderedDish } from 'src/app/interfaces/dish';

@Component({
  selector: 'app-completed-order',
  templateUrl: './completed-order.component.html',
  styleUrls: ['./completed-order.component.scss']
})
export class CompletedOrderComponent {

  @Input() orderedDish: OrderedDish;

  @Output() onCardClick:EventEmitter<void> = new EventEmitter<void>();
  
  constructor() {
  }

}
