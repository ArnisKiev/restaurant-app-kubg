import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CookingPlace } from "src/enums/cookingPlace";
import { Role } from "src/enums/role";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    name: string;

    @Prop()
    surname: string;

    @Prop()
    role: Role;

    @Prop()
    code?: string;

    @Prop()
    cookingPlace?: CookingPlace;
}

export const UserSchema = SchemaFactory.createForClass(User);