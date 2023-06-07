import { NestFactory } from "@nestjs/core";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { type } from "os";
import { CookingPlace } from "src/enums/cookingPlace";
import { IComponent } from "src/interfaces/component";

export type DishDocument = Dish & Document; 

@Schema()
export class Dish {
    @Prop()
    title: string; 

    @Prop()
    description: string;

    @Prop()
    components: IComponent[];

    @Prop({default: false})
    isStopList:boolean; 

    @Prop()
    cookingPlace: CookingPlace;

    @Prop()
    cookingTime: number; //minutes

    @Prop()
    price: number;
}

export const DishSchema = SchemaFactory.createForClass(Dish);



