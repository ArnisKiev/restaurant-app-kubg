import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRepository } from 'src/interfaces/IRepository';
import { User } from 'src/schemas/users.schema';
import { RandomCodeService } from '../random-code/random-code.service';

@Injectable()
export class UserService implements IRepository<User>{

    /**
     *
     */
    constructor(
        @InjectModel(User.name) private UserModel: Model<User>,
        private randomCodeService: RandomCodeService
    ) {}


    async create(user: User) {
        
        const code = await this.randomCodeService.generateCode();
        console.log(code)
        const isCodeExecuting = await this.checkIsCodeUniq(code);
        console.log(isCodeExecuting)

        if (isCodeExecuting) {
            return await this.create(user);
        }

        console.log('SAVING!!!!')

        user.code = code;
        const createdUser = new this.UserModel(user);

        return await createdUser.save();
    }

    async getUserByCode(user: User) {
        return await this.UserModel.findOne({code: user.code }).exec();
    }

    async getAllUsers() {
        return await this.UserModel.find({});
    }


    delete(user: User) {
        return this.UserModel.deleteOne(user);
    }

    update(item: User) {
        return this.UserModel.findOneAndUpdate({
            _id: (item as any)?._id,
        }, item)
    }


    findById(id: any) {
        throw new Error('Method not implemented.');
    }

    private async checkIsCodeUniq(code: string): Promise<boolean> {
        const isExisting = await this.UserModel.findOne({code}).exec();
        console.log(isExisting)
        return isExisting !== null;
    }
}
