import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { pick } from 'lodash';
import { Model } from 'mongoose';
import { async, merge, Observable, Subject } from 'rxjs';
import { OrderDishState } from 'src/enums/order-dish-state';
import { IRepository } from 'src/interfaces/IRepository';
import { IAddDishesToOrder, IChangedOrderedDishState, OrderedDish } from 'src/interfaces/ordered-dish';
import { IWebsocketMessage, WebsocketMessageType } from 'src/interfaces/websocket-message.interface';
import { Order, OrderDocument } from 'src/schemas/order.schema';

@Injectable()
export class OrderService implements IRepository<Order> {

    private  onCreatingOrder$$: Subject<IWebsocketMessage> = new Subject<IWebsocketMessage>();
    private onUpdatingOrder$$: Subject<IWebsocketMessage> = new Subject<IWebsocketMessage>();
    
    orderChannel$: Observable<IWebsocketMessage> = merge(
      this.onCreatingOrder$$,
      this.onUpdatingOrder$$
    );


    constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {
    }

    async create(order: Order) {
        order?.dishes.forEach(dish => {
            dish.orderTime = new Date(Date.now());
            dish.orderDishState = OrderDishState.InProgress;
            dish.table = order.table;
            dish.waiter = order.waiter;
        })

       const createdOrder = new this.orderModel(order);
       this.notifyAboutCreatingOrder(order.dishes);

       return await createdOrder.save();
    }

    private notifyAboutCreatingOrder(orderedDishes: OrderedDish[]) {
        const message: IWebsocketMessage = {
            type: WebsocketMessageType.OrderCreatingMessage,
            channel: 'Order',
            payload: orderedDishes
        }
        this.onCreatingOrder$$.next(message);
    }

    private notifyAboutUpdatingOrederedDishState(orderedDish: OrderedDish) {
        const message: IWebsocketMessage = {
            type: WebsocketMessageType.OrderedDishUpdatingState,
            channel: 'Order',
            payload: orderedDish
        }

        this.onUpdatingOrder$$.next(message);
    }

    async getAllPreparingOrders() {
        const result = await this.orderModel.aggregate([
            { $unwind: "$dishes" },
            {
              $match: {
                "dishes.orderDishState": { $ne: OrderDishState.Closed }
              }
            },
            {
              $group: {
                _id: null,
                dishes: { $push: "$dishes" }
              }
            },
            {
              $project: {
                _id: 0,
                dishes: 1
              }
            }
          ]);
          
          return result?.[0]?.dishes ?? [];
    }

    async changeStateOrderedDish(data: IChangedOrderedDishState) {


      const order = await this.orderModel.findOne(
        {
          table: data.table,
          isActive: true,
        }
      );
      

   
     
      const updatedDishIndex = order.dishes.findIndex(dish => dish._id === data.orderedDish._id && dish.orderDishState === data.previousState)

      const updatedDish = order.dishes[updatedDishIndex];


      const keyToUpdate = `dishes.${updatedDishIndex}.orderDishState`;

      await this.orderModel.findOneAndUpdate(
        {
          table: data.table,
          isActive: true,
        },
        {
          $set: {
            [keyToUpdate]: data.dishState // Обновляем orderDishState для элемента массива dishes с динамическим индексом
          }
        },
        {
          new: true, // Возвращать обновленный документ
          returnDocument: 'after' // Возвращает обновленный документ
        }
      );


      updatedDish.orderDishState = data.dishState;
   
      this.notifyAboutUpdatingOrederedDishState(updatedDish);
      
        return true;
      }
      
    delete(item: Order) {
        throw new Error('Method not implemented.');
    }
    update(item: Order) {

      const newDishes = item.dishes.filter(dish => dish.orderDishState === OrderDishState.InProgress);

      if (!newDishes.length) {
        this.notifyAboutCreatingOrder(newDishes);
      }

        return this.orderModel.findOneAndUpdate({
          table: item.table,
          isActive: true
        }, item);
    }


    async getOrderByTable(table: number) {
      return await this.orderModel.findOne({
        table,
        isActive: true
      });
    }

    async addDishesToOrder(data: IAddDishesToOrder) {
      const order = await this.orderModel.findOne({
        table: data.table,
        isActive: true
      });

      if (order) {
        const dishes = data.dishes;

        dishes.forEach(dish => {
          dish.orderTime = new Date(Date.now());
          dish.orderDishState = OrderDishState.InProgress;
          dish.table = order.table;
          dish.waiter = order.waiter;
      })

      this.notifyAboutCreatingOrder(data.dishes);
        order.dishes.push(...dishes);

        


        await order.save();
      } 

      return true;
    }
}



