import { Component } from '@angular/core';
import { OrderDishState } from 'src/app/enums/order-dish-state';
import { IChangedOrderedDishState, OrderedDish } from 'src/app/interfaces/dish';
import { ApplicationStateService } from 'src/app/services/application-state.service';
import { ModalService } from 'src/app/services/modal.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cook-screen',
  templateUrl: './cook-screen.component.html',
  styleUrls: ['./cook-screen.component.scss']
})
export class CookScreenComponent {

  constructor(public orderService: OrderService,
    public applicationStateService: ApplicationStateService, 
    public modalService: ModalService
    ) {
   
  }


  onCompletePreparingOrderedDish(orderedDish: OrderedDish) {
  const changeStateOrderedDish: IChangedOrderedDishState = {
    orderedDish,
    dishState: OrderDishState.WaitingWaiter,
    table: orderedDish.table ,
    previousState:OrderDishState.InProgress
  }
  this.orderService.updateOrderedDishState(changeStateOrderedDish).subscribe();
}


onCardClick(orderedDish: OrderedDish) {

  const question: string = `Блюдо ${orderedDish.title} для стола № ${orderedDish.table} приготовлено?`;
  const confirmAction: () => void = ()=>this.onCompletePreparingOrderedDish(orderedDish);


  this.modalService.openConfirmActionWindow(question, confirmAction);
}



  get preparingDishes(): OrderedDish[] {

    return this.orderService.preparingDishes
    .filter(preparingDish => preparingDish.cookingPlace === this.applicationStateService.user?.cookingPlace
      && preparingDish.orderDishState === OrderDishState.InProgress);
  }

}
