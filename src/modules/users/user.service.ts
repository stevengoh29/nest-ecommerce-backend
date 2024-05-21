import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseError } from 'mongoose';
import { User } from './schema/user.schema';
import { IUsersService } from './interface/service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { AuthenticationException } from 'src/exceptions/security';
import { UserResponseDto } from './dto/user-response.dto';
import { DatabaseException } from 'src/exceptions/common';

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

    async validateUser(username: string, pass: string): Promise<UserResponseDto> {
        const user = await this.userModel.findOne({ username });
        if (!user) throw new AuthenticationException();
        if (user.password != pass) throw new AuthenticationException();

        const { password, ...result } = user.toJSON();
        return result;
    }

    async addUser(userRegisterDto: UserRegisterDto): Promise<User> {
        try {
            return await this.userModel.create(userRegisterDto);
        } catch (error) {
            this.logger.error(error)   
            throw new DatabaseException();
        }
    }
}