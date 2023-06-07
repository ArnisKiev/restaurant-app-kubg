import { Option } from "./options";

export interface User {
    name: string;
    surname: string;
    role: Role;
    code?: string;
    cookingPlace?: CookingPlace; 
}

export enum Role {
    ADMIN = 'ADMIN',
    COOK = 'COOK',
    WAITER = 'WAITER'
}

export enum CookingPlace {
    BAR = 'BAR',
    KITCHEN = 'KITCHEN',
    SUSHI_BAR = "SUSHI-BAR"
}



export const CookingPlaceOptions: Option<CookingPlace, string>[] = [
    {
        displayValue: 'Бар',
        value: CookingPlace.BAR
    }, 
    {
        displayValue: 'Кухня',
        value: CookingPlace.KITCHEN
    },
    {
        displayValue: 'Суші-бар',
        value: CookingPlace.SUSHI_BAR
    }    
]

export const RolesOptions: Option<Role, string>[] = [
    {
        value: Role.ADMIN,
        displayValue: 'Адміністратор'
    },
    {
        value: Role.COOK,
        displayValue: 'Кухар'
    },
    {
        value: Role.WAITER,
        displayValue: 'Офіціант'
    }
]






