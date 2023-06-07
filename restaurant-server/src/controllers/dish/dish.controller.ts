import { Body, Controller, Get, Post } from '@nestjs/common';
import { Dish } from 'src/schemas/dish.schema';
import { DishService } from 'src/services/dish/dish.service';

@Controller('dish')
export class DishController {

    /**
     *
     */
    constructor(
        private dishService: DishService
    ) {        
    }

    @Get()
    async getDishes() {
        return await this.dishService.readAll();
    }

    @Post()
    async createDish(@Body() dish:Dish) {
        return await this.dishService.create(dish);
    }

}
