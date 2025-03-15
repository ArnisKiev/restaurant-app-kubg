import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { IAddDishesToOrder, IChangedOrderedDishState } from 'src/interfaces/ordered-dish';
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

    @Get('get-order-by-table')
    async getOrderBuTable(@Query('table') table: number) {
        return this.orderService.getOrderByTable(+table);
    }

    @Put()
    async updateOtder(@Body() order) {
        return await this.orderService.update(order);
    }

    @Put('add-dishes-to-order')
    async addDishesToOrder(@Body() data: IAddDishesToOrder) {
       return await  this.orderService.addDishesToOrder(data);
    }

}
