import { HttpServer, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRepository } from 'src/interfaces/IRepository';
import { Dish } from 'src/schemas/dish.schema';
import { Request } from 'express';

@Injectable()
export class DishService implements IRepository<Dish> {
    /**
     *
     */
    constructor(
        @InjectModel(Dish.name) private DishModel: Model<Dish>, 
        @Inject(REQUEST) private request: Request) {
    }

    async readAll() {
        const dishes = await this.DishModel.find({});

        const protocol = this.request?.protocol;
        const host = this.request.get('host');

        return dishes.map(dish => {
            dish.imgPath = `${protocol}://${host}/dishImages/${dish.imgPath}`;
            return dish;
        });
    }

     async create(dish: Dish): Promise<Dish> {
        const createdDish = new this.DishModel(dish);
        return await createdDish.save();
    }
    delete(item: Dish) {
        return this.DishModel.deleteOne(item);
    }
    update(item: Dish) {
        return this.DishModel.updateOne({
            _id: (item as any)?._id
        }, {...item })
    }
    findById(id: any) {
        throw new Error('Method not implemented.');
    }
}
