import { Module} from '@nestjs/common';
import { WebSocketGateaway } from 'src/getaway/web-socket-gataway';
import { OrderModule } from '../order/order.module';
import { OrderService } from 'src/services/order/order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/schemas/order.schema';

@Module({
    imports: [OrderModule],
    providers: [WebSocketGateaway]
})
export class WebSocketModule  {
}

