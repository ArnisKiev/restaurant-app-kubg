import { Component } from '@angular/core';
import { AdminComponents } from 'src/app/enums/displaying-component';
import { MenuOption } from 'src/app/interfaces/options';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {


  /**
   *
   */
  constructor(public orderService: OrderService) {

  }

  currentComponent: AdminComponents = AdminComponents.ManageEmployee;
  adminComponents = AdminComponents; 

  public listMenuItems: MenuOption[] = [

    {
      itemName: 'Управління персоналом',
      onClickAction: () => this.currentComponent = AdminComponents.ManageEmployee,
      isDefault: true
    }, 
    {
      itemName: 'Позиції',
      onClickAction: () => this.currentComponent = AdminComponents.ManageDishes
    },
    {
      itemName: 'Актуальні замовлення',
      onClickAction: () => this.currentComponent = AdminComponents.OrderedDishes
    }

    // 'Вийти',
  ]

}
