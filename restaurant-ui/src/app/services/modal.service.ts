import { Injectable } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { DishInfoComponent } from '../modals/dish-info/dish-info.component';
import { AddingNewDishComponent } from '../modals/adding-new-dish/adding-new-dish.component';
import { AddingNewEmployeeComponent } from '../modals/adding-new-employee/adding-new-employee.component';
import { TableComponent } from '../shared/table/table.component';
import { OrderCreatingComponent } from '../screens/waiter/order-creating/order-creating.component';
import { DishesManageComponent } from '../screens/admin/dishes-manage/dishes-manage.component';
import { Dish, OrderedDish } from '../interfaces/dish';
import { ConfirmActionComponent } from '../modals/confirm-action/confirm-action.component';
import { User } from '../interfaces/user';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) {}

  public openDishInfoModal(dish: Dish) {
    const dialogRef = this.dialog.open(DishInfoComponent, {
      width: '50%',
      height: '50%',
      data: { dish },
    });

  }

  public openCreatingTableOrderModal(data: any) {
    const dialogRef = this.dialog.open(OrderCreatingComponent, {
      width: '100vw',
      height: '75%',
      data,
    });
  }

  public openAddingDishModal(dish?: Dish) {
    this.dialog.open(AddingNewDishComponent, {
      width: '80%',
      height: 'auto',
      data: { dish },
    });
  }

  public openConfirmActionWindow(question: string, onActionConfirm: () => void) {
    const dialogRef = this.dialog.open(ConfirmActionComponent, {
      width: '40%',
      height: 'auto',
      data: {
        question,
        onActionConfirm,
      },
    });

      this.breakpointObserver.observe([Breakpoints.XSmall ,Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large])
    .subscribe(res => {

      switch(true) {
        case res.breakpoints[Breakpoints.XSmall] :
        dialogRef.updateSize('100%', 'auto');
        break;
      }
    })

  }

  public openAddNewEmployeeModal(user: User = null) {
    const dialogRef = this.dialog.open(AddingNewEmployeeComponent, {
      width: '40%',
      height: 'auto',
      data: { user },
    });

    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
      ])
      .subscribe((res) => {
        switch (true) {
          case res.breakpoints[Breakpoints.XSmall]:
            dialogRef.updateSize('150%', '90%');
            break;
        }
      });
  }
}
