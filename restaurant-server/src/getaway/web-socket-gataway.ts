
import { OnModuleInit } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Subject, merge } from "rxjs";
import { Server, Socket } from "socket.io";
import { OrderService } from "src/services/order/order.service";

@WebSocketGateway({
    cors: {
        origin: '*'
    }
})
export class WebSocketGateaway implements OnGatewayConnection, OnGatewayInit, OnModuleInit{

    notifyCreatingOrder: Subject<any> = new Subject<any>();

    clients: Socket[] = [];

  
    /**
     *
     */
    constructor(
        private orderService: OrderService
    ) {
    }

    onModuleInit() {
        merge(
        this.orderService.orderChannel$
        )
        .subscribe(message => {
            this.server.emit('message', message);
        })
    }

    afterInit(server: Server) {
        this.server = server;
    }

    handleConnection(client:  Socket, ...args: any[]) {
       this.clients.push(client);
       console.log('client was connected')
       client.emit('message', {
        message: 'Notify on connection!'
       })


       this.server.emit('test', {
        test: 'server is working!'
       })

    }

    // @SubscribeMessage('message')
    // test(@MessageBody() body) {
    //   this.server.emit('test', {
    //     test: 'is workin'
    //   })
    // }

    @WebSocketServer()
    server: Server 

}