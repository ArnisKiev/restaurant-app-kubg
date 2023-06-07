import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { WebSocketSubject } from 'rxjs/webSocket';
import { IWebsocketMessage, WebsocketMessageType } from '../interfaces/web-socket';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket = io('http://localhost:3000', {
    autoConnect: true
  });



  constructor(
    private orderService: OrderService
  ) { }

  initSocket() {


  
    this.socket.on('message', (message: IWebsocketMessage) => {
    
      switch(message.type) {
        case WebsocketMessageType.OrderCreatingMessage: 
        return this.orderService.processOnOrderCreating(message);
        case WebsocketMessageType.OrderedDishUpdatingState: 
        return this.orderService.processOnUpdatingOrederedDishState(message);

      }


    })
  }

}
