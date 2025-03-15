import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { CookScreenComponent } from './screens/cook/cook-screen/cook-screen.component';
import { SignInComponent } from './screens/sign-in/sign-in.component';
import { routs } from './constants/routes';
import { SignInFormComponent } from './screens/sign-in/sign-in-form/sign-in-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MenuListComponent } from './shared/menu-list/menu-list.component';
import { AdminComponent } from './screens/admin/admin.component';
import { AddingNewDishComponent } from './modals/adding-new-dish/adding-new-dish.component';
import { DishInfoComponent } from './modals/dish-info/dish-info.component';
import { AddingNewEmployeeComponent } from './modals/adding-new-employee/adding-new-employee.component';
import { ModalService } from './services/modal.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { DishesManageComponent } from './screens/admin/dishes-manage/dishes-manage.component';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import NavbarComponent from './layouts/navbar/navbar.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WaiterComponent } from './screens/waiter/waiter.component';
import { TablesComponent } from './screens/waiter/tables/tables.component';
import { OrderCreatingComponent } from './screens/waiter/order-creating/order-creating.component';
import { TableComponent } from './shared/table/table.component';
import { DishCardComponent } from './shared/dish-card/dish-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { OrderFormComponent } from './screens/waiter/order-creating/order-form/order-form.component';
import { OrderConfirmComponent } from './screens/waiter/order-creating/order-confirm/order-confirm.component';
import { BillComponent } from './screens/waiter/order-creating/bill/bill.component';
import { MessageMenuComponent } from './screens/waiter/message-menu/message-menu.component';
import { OrderComponent } from './shared/order/order.component';
import { WebSocketService } from './services/web-socket.service';
import { CookCardComponent } from './shared/cook-card/cook-card.component';
import { CompletedOrderComponent } from './layouts/navbar/completed-order/completed-order.component';
import { OrderService } from './services/order.service';
import { AuthorizationService } from './services/authorization.service';
import { EmployeeManagagingComponent } from './screens/admin/employee-managaging/employee-managaging.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PreparingDishesComponent } from './shared/preparing-dishes/preparing-dishes.component';
import { ConfirmActionComponent } from './modals/confirm-action/confirm-action.component';
import { NegativeTimePipe } from './pipes/negative-time.pipe';
import {LayoutModule} from '@angular/cdk/layout';
import {MatMenuModule} from '@angular/material/menu';
import { CounterComponent } from './shared/counter/counter.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [
    AppComponent,
    CookScreenComponent,
    SignInComponent,
    SignInFormComponent,
    MenuListComponent,
    AdminComponent,
    AddingNewDishComponent,
    DishInfoComponent,
    AddingNewEmployeeComponent,
    DishesManageComponent,
    NavbarComponent,
    WaiterComponent,
    TablesComponent,
    OrderCreatingComponent,
    TablesComponent,
    TableComponent,
    DishCardComponent,
    OrderFormComponent,
    OrderConfirmComponent,
    BillComponent,
    MessageMenuComponent,
    OrderComponent,
    CookCardComponent,
    CompletedOrderComponent,
    EmployeeManagagingComponent,
    PreparingDishesComponent,
    ConfirmActionComponent,
    NegativeTimePipe,
    CounterComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    RouterModule.forRoot(routs),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatDividerModule,
    MatIconModule,
    MatCheckboxModule,
    HttpClientModule,
    MatProgressSpinnerModule, 
    MatTooltipModule, 
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatPaginatorModule, 
    LayoutModule, 
    MatMenuModule,
    FontAwesomeModule
  ],
  exports: [RouterModule],
  providers: [ MatDialog,
    {
      provide: APP_INITIALIZER,
      useFactory: (webSocketService: WebSocketService) => () => webSocketService.initSocket(),
      deps: [WebSocketService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (orderService: OrderService) => () => orderService.initPreparingDishes(),
      deps: [OrderService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (authorizationService: AuthorizationService) => () => authorizationService.startRoutingRedirects(),
      deps: [AuthorizationService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
