import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/controllers/user/user.controller';
import { User, UserSchema } from 'src/schemas/users.schema';
import { UserService } from 'src/services/user/user.service';
import { RandomCodeModule } from '../random-code/random-code.module';
import { RandomCodeService } from 'src/services/random-code/random-code.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema}]), RandomCodeModule],
    controllers: [UserController],
    providers: [UserService, RandomCodeService]
})
export class UsersModule {}
