import { Body, Controller, Delete, Get, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Dish } from 'src/schemas/dish.schema';
import { DishService } from 'src/services/dish/dish.service';
import * as fs from 'fs';
import { extname } from 'path';


@Controller('dish')
export class DishController {

    /**
     *
     */
    constructor(
        private dishService: DishService
    ) {        
    }

    @Get()
    async getDishes() {
        return await this.dishService.readAll();
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createDish(@UploadedFile() file, @Body('dish') dishJson: string) {

        const fileName = `${Date.now()}${extname(file.originalname)}`;

        const path = `src/dishImages/${fileName}`;

        try { 
            const writeStream = fs.createWriteStream(path);
            
            // Пишем данные файла в поток
            writeStream.write(file.buffer);
            // Закрываем поток
            writeStream.end();
      
            
          } catch (error) {
            console.log(error)
          }

        const dish: Dish = JSON.parse(dishJson);
        dish.imgPath = fileName;

        return await this.dishService.create(dish);
    }

    @Put()
    @UseInterceptors(FileInterceptor('file'))
    async updateDish(@UploadedFile() file, @Body('dish') dishJson: string) {
        const dish: Dish = JSON.parse(dishJson);

        delete dish['imgPath'];

        if (file) {

            const fileName = `${Date.now()}${extname(file.originalname)}`;

            const path = `src/dishImages/${fileName}`;

            try {
                const writeStream = fs.createWriteStream(path);

                // Пишем данные файла в поток
                writeStream.write(file.buffer);
                // Закрываем поток
                writeStream.end();


            } catch (error) {
                console.log(error)
            }

            dish.imgPath = fileName;
        }

        return await this.dishService.update(dish);
    }

    @Delete()
    async deleteDish(@Body() dish:Dish) {
        return await this.dishService.delete(dish)
    }

}
