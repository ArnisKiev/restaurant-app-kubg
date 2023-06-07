import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./users.schema";
import { OrderedDish } from "src/interfaces/ordered-dish";

export type OrderDocument = Order & Document;

@Schema()
export class Order {

    @Prop()
    table: number;

    @Prop()
    dishes: OrderedDish[];

    @Prop()
    waiter: User;

    @Prop({
        default: true
    })

    isActive: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);