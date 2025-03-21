import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuleRef } from '@nestjs/core';
import { UsersModule } from './modules/users/users.module';
import { DishModule } from './modules/dish/dish.module';
import { OrderModule } from './modules/order/order.module';
import { WebSocketModule } from './modules/web-socket/web-socket.module';

@Module({
  imports: [ 
    MongooseModule.forRoot('mongodb+srv://nkazantsev0105:nik20033002@arnis-projects.rdzte3w.mongodb.net/restaurant?retryWrites=true&w=majority'),
    UsersModule,
    DishModule,
    OrderModule,
    WebSocketModule
  ],
    
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly moduleRef: ModuleRef) {}
  
}
