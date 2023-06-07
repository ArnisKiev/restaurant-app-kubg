import { CookingPlace } from "../interfaces/user";

export const Images: {[key in CookingPlace]: string} = {
    [CookingPlace.BAR]: 'https://sushiya.ua/media/sushiya/images/products/cache/0/f/b/b/3/0fbb3758fdbb4f6a6aa2c90c9a781ec2b87cb3b3.webp',
    [CookingPlace.KITCHEN]: 'https://sushiya.ua/media/sushiya/images/products/cache/1/0/d/c/b/10dcb2e5336a99562833bb3e02a564359e660858.webp',
    [CookingPlace.SUSHI_BAR]: 'https://sushiya.ua/media/sushiya/images/products/cache/1/b/b/f/c/1bbfc4717abb82b2dd2e095b1fa1033e8ae241b8.webp'
}
