import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/schemas/users.schema';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {


    constructor(private userService: UserService) {
    }

  
    @Post('getUserByCode')
    async getUserByCode(@Body() user: User) {
     console.log(user);
     return await this.userService.getUserByCode(user);   
    }

    @Post()
    async createUser(@Body() user: User): Promise<User> {
        return await this.userService.create(user);
    }

    @Get() 
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }
     

}
