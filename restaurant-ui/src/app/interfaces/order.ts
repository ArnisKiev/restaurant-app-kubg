import { Dish, OrderedDish } from "./dish";
import { User } from "./user";


export interface Order {
    table: number;
    dishes: (OrderedDish | Dish)[];
    waiter: User;
    isActive?: boolean;
}