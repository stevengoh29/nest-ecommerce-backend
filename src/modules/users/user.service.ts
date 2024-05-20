import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { IUsersService } from './user.interface';
import { UserRegisterDto } from './dto/user-register.dto';

@Injectable()
export class UsersService implements IUsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async getUsers(): Promise<User[]> {
        return await this.userModel.find();
    }

    async getUserById(userId: string): Promise<User> {
        return await this.userModel.findById(userId);
    }

    async addUser(userRegisterDto: UserRegisterDto): Promise<User> {
        return await this.userModel.create(userRegisterDto);
    }
}