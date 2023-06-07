import { Body, Controller, Get, Post } from '@nestjs/common';
import { IChangedOrderedDishState } from 'src/interfaces/ordered-dish';
import { Order } from 'src/schemas/order.schema';
import { OrderService } from 'src/services/order/order.service';

@Controller('order')
export class OrderController {

    /**
     *
     */
    constructor(private orderService: OrderService) {
    }

    @Post()
    async createOrder(@Body() order: Order) {
        return await this.orderService.create(order);
    }

    @Get('allPreparingDishes')
    async getAllPreparingOrders() {
        return await this.orderService.getAllPreparingOrders();
    }

    @Post('update-ordered-dish-state')
    async updateOrderedDishState(@Body() data: IChangedOrderedDishState) {
        return await this.orderService.changeStateOrderedDish(data);
    }


}
