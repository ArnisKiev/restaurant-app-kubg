import { OrderDishState } from "../enums/order-dish-state";
import { CookingPlace, User } from "./user";

export interface ComponentDish {
    name: string;
    weight: number;
}

export interface Dish {
    title: string;
    components?: ComponentDish[];
    cookingPlace?: CookingPlace;
    cookingTime?: number;
    isStopList?: boolean;
    price: number;
    imgPath: string;
}

export interface OrderedDish extends Dish {
    orderDishState: OrderDishState;
    orderTime: Date;
    table: number;
    waiter: User;
    _id?: string;
}

export interface IChangedOrderedDishState {
    table: number;
    orderedDish: OrderedDish;
    dishState: OrderDishState;
    previousState: OrderDishState;
}