import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DishController } from 'src/controllers/dish/dish.controller';
import { Dish, DishSchema } from 'src/schemas/dish.schema';
import { DishService } from 'src/services/dish/dish.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Dish.name, schema: DishSchema}])],
    controllers: [DishController],
    providers: [DishService]
})
export class DishModule {}
