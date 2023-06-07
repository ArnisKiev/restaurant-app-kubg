import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from 'src/controllers/order/order.controller';
import { WebSocketGateaway } from 'src/getaway/web-socket-gataway';
import { Order, OrderSchema } from 'src/schemas/order.schema';
import { OrderService } from 'src/services/order/order.service';
import { WebSocketModule } from '../web-socket/web-socket.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema}])],
    providers: [OrderService],
    controllers: [OrderController],
    exports: [OrderService]
})
export class OrderModule {}
