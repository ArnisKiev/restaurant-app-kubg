import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRepository } from 'src/interfaces/IRepository';
import { Dish } from 'src/schemas/dish.schema';

@Injectable()
export class DishService implements IRepository<Dish> {
    /**
     *
     */
    constructor(@InjectModel(Dish.name) private DishModel: Model<Dish>) {
    }

    async readAll() {
        return await this.DishModel.find({});
    }

     async create(dish: Dish): Promise<Dish> {
        const createdDish = new this.DishModel(dish);
        return await createdDish.save();
    }
    delete(item: Dish) {
        throw new Error('Method not implemented.');
    }
    update(item: Dish) {
        throw new Error('Method not implemented.');
    }
    findById(id: any) {
        throw new Error('Method not implemented.');
    }
}
