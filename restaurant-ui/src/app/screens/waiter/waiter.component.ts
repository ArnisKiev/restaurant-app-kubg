import { Component, OnInit } from '@angular/core';
import { WaiterComponents } from 'src/app/enums/displaying-component';
import { MenuOption } from 'src/app/interfaces/options';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.scss']
})
export class WaiterComponent implements OnInit {
  ngOnInit(): void {
    this.menuService.setMenuOptions(this.listMenuItems);
  }



  /**
   *
   */
  constructor(
    public menuService: MenuService
  ) {

  }

  currentComponent: WaiterComponents = WaiterComponents.Tables;
 waiterComponents = WaiterComponents;

  public listMenuItems: MenuOption[] = [
    {
      itemName: 'Зал',
      onClickAction: () => this.currentComponent = WaiterComponents.Tables,
      isDefault: true
  
    }, 
    {
      itemName: 'Замовлення',
      onClickAction: () =>  this.currentComponent = WaiterComponents.OrderedDishes   
    },
    {
      itemName: 'Вийти',
      onClickAction: () => this.currentComponent = WaiterComponents.OrderedDishes
    }, 

  ]




}
