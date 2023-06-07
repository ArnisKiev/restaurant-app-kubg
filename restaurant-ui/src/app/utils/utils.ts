import { CookingPlace } from "../interfaces/user";

export function convertCookingPlaceFromEngToUa(cookingPlace: CookingPlace) {
    switch(cookingPlace) {
        case CookingPlace.BAR: 
        return 'Бар';
        case CookingPlace.SUSHI_BAR:
            return 'Суші-бар';
        case CookingPlace.KITCHEN: 
        return 'Кухня'; 
        default :
        return '-';
    }
}


export function getMapCountElementsFromArray<T>(elements: T[]) {

    const map: Map<T, number> = new Map<T, number>();

    elements.forEach(element => {
        if (map.has(element)) {
            const currentCount = map.get(element);
            map.set(element, currentCount + 1);
        } else {
            map.set(element, 1);
        }
    })

    return map;
}
