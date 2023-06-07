import { Component, HostBinding, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isEqual } from 'lodash';
import { OrderDishState } from 'src/app/enums/order-dish-state';
import { IChangedOrderedDishState, OrderedDish } from 'src/app/interfaces/dish';
import { Role } from 'src/app/interfaces/user';
import { ApplicationStateService } from 'src/app/services/application-state.service';
import { MenuService } from 'src/app/services/menu.service';
import { ModalService } from 'src/app/services/modal.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export default class NavbarComponent {
  isActive = false;

  handleClick() {
    this.isActive = !this.isActive;
  }

  @HostBinding('class.hidden')
  get isHiddenNavbar() {
    return this.router.url === '/sign-in';
  }

  constructor(
    public router: Router,
    public applicationState: ApplicationStateService,
    public orderService: OrderService,
    public modalService: ModalService,
    public menuService: MenuService
  ) {
  
  }

  onCompletePreparingOrderedDish(orderedDish: OrderedDish) {
    const changeStateOrderedDish: IChangedOrderedDishState = {
      orderedDish,
      dishState: OrderDishState.Closed,
      table: orderedDish.table,
      previousState: OrderDishState.WaitingWaiter,
    };
    this.orderService
      .updateOrderedDishState(changeStateOrderedDish)
      .subscribe(res => console.log(res));
  }

  onCardClick(orderedDish: OrderedDish) {
    const question: string = `Блюдо ${orderedDish.title} для стола № ${orderedDish.table} віднесено?`;
    const confirmAction: () => void = () =>
      this.onCompletePreparingOrderedDish(orderedDish);
    this.modalService.openConfirmActionWindow(question, confirmAction);
  }

  get showBell() {
    return this.applicationState?.user?.role === Role.WAITER;
  }

  get messageLength() {
    return this.completedOrderedDishForWaiter.length;
  }

  public get completedOrderedDishForWaiter() {
    return this.orderService.preparingDishes.filter(
      (orderedDish) =>
        isEqual(orderedDish?.waiter, this.applicationState?.user) &&
        orderedDish.orderDishState === OrderDishState.WaitingWaiter
    );
  }
}
