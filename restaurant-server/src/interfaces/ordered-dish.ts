import { OrderDishState } from "src/enums/order-dish-state";
import { Dish } from "src/schemas/dish.schema";
import { User } from "src/schemas/users.schema";

export interface OrderedDish extends Dish {
    _id?: string;
    orderDishState: OrderDishState;
    orderTime: Date;
    waiter: User;
    table: number;
    isActive: boolean;
}


export interface IChangedOrderedDishState {
    table: number;
    orderedDish: OrderedDish;
    dishState: OrderDishState;
    previousState: OrderDishState;
}