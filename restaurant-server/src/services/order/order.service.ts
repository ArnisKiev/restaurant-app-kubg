import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { pick } from 'lodash';
import { Model } from 'mongoose';
import { async, Subject } from 'rxjs';
import { OrderDishState } from 'src/enums/order-dish-state';
import { IRepository } from 'src/interfaces/IRepository';
import { IChangedOrderedDishState, OrderedDish } from 'src/interfaces/ordered-dish';
import { IWebsocketMessage, WebsocketMessageType } from 'src/interfaces/websocket-message.interface';
import { Order, OrderDocument } from 'src/schemas/order.schema';

@Injectable()
export class OrderService implements IRepository<Order> {

    onCreatingOrder$$: Subject<IWebsocketMessage> = new Subject<IWebsocketMessage>();
    onUpdatingOrder$$: Subject<IWebsocketMessage> = new Subject<IWebsocketMessage>();

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


        const order = await this.orderModel.findOneAndUpdate(
            {
              table: data.table,
              isActive: true,
              dishes: {
                $elemMatch: {
                  _id: data.orderedDish._id,
                  orderDishState: data.previousState
                },
              },
            },
            {
              $set: {
                "dishes.$[elem].orderDishState": data.dishState,
              },
            },
            {
              new: true,
              arrayFilters: [
                { "elem._id": data.orderedDish._id, "elem.orderDishState": data.previousState },
              ],
            }
          );
        
          if (!order) {
            return null;
          }
        
        const updatedDish = order.dishes.find(dish => dish?._id === data.orderedDish?._id && dish.orderDishState === data.dishState )

        this.notifyAboutUpdatingOrederedDishState(updatedDish);
      
        return true;
      }
      
    delete(item: Order) {
        throw new Error('Method not implemented.');
    }
    update(item: Order) {
        throw new Error('Method not implemented.');
    }
    findById(id: any) {
        throw new Error('Method not implemented.');
    }


    createOrder(order: Order): Promise<Order> {
        return new Promise(async (resolve, reject) => {
            const newOrder = new this.orderModel(order);
            try {
                await newOrder.save();
                const msg: IWebsocketMessage = {
                    payload: order,
                    type: WebsocketMessageType.OrderCreatingMessage,
                    channel: 'Order'
                }

                this.onCreatingOrder$$.next(msg);

                resolve(order);
            } catch (ex) {
                reject(ex);
            }
        })
    }

    updateOrder(id: string, order: Order): Promise<Order> {
        return new Promise(async (resolve, reject) => {
            const previousOrder = await this.orderModel.findById(id); //refactoring

            // const newDishes = order.dishes.reduce((newDishes, curerentDish)=>{
            //     if ()
            // }, []);
            
            
        })
    }




}
