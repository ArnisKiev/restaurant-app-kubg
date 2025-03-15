import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { IWebsocketMessage, WebsocketMessageType } from '../interfaces/web-socket';
import { DynamicOrderService } from './dynamic-order.service';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {

  socket = io(window.location.origin, {
    autoConnect: true,
    path: '/socket.io'
  });



  constructor(
    private dynamicOrderService: DynamicOrderService
  ) { }

  initSocket() {  
    this.socket.on('message', (message: IWebsocketMessage) => {
      switch(message.type) {
        case WebsocketMessageType.OrderCreatingMessage: 
        return this.dynamicOrderService.orderService.processOnOrderCreating(message);
        case WebsocketMessageType.OrderedDishUpdatingState: 
        return this.dynamicOrderService.orderService.processOnUpdatingOrederedDishState(message);
      }
    })
  }

}
